local utils = require 'client.utils'
local responseBuyer = nil

RegisterNetEvent('tgg-contracts:client:openContract', function()
    local playerCoords = GetEntityCoords(cache.ped)

    local closestPlayer = lib.getClosestPlayer(playerCoords, Config.ContractDistance, false)
    if not closestPlayer then return lib.notify({ id = 'no_close_player', description = locale('no_close_player'), type = 'error' }) end

    local closestVehicle = lib.getClosestVehicle(playerCoords, 3, true)
    if not closestVehicle then return lib.notify({ id = 'no_close_vehicle', description = locale('no_close_vehicle'), type = 'error' }) end

    local vehProps = lib.getVehicleProperties(closestVehicle)
    if not vehProps then return end

    local vehModel = GetEntityModel(closestVehicle)
    if Config.BlacklistedVehicles[vehModel] then return lib.notify({ id = 'blacklisted_vehicle', description = locale('blacklisted_vehicle'), type = 'error' }) end

    TaskStartScenarioInPlace(cache.ped, 'WORLD_HUMAN_CLIPBOARD', 0, false)

    local nearbyPlayer = utils.findNearbyPlayer(playerCoords)
    if not nearbyPlayer then return lib.notify({ id = 'no_nearby_player', description = locale('no_close_player'), type = 'error' }) end

    local sellerName = lib.callback.await('tgg-contracts:server:getPlayerName', false, cache.serverId)
    local buyerName = lib.callback.await('tgg-contracts:server:getPlayerName', false, nearbyPlayer)

    local contract = {
        isSeller = true,
        buyerName = buyerName,
        buyerId = nearbyPlayer,
        sellerName = sellerName,
        sellerId = cache.serverId,
        vehicleModel = GetDisplayNameFromVehicleModel(vehProps.model),
        vehiclePlate = vehProps.plate,
    }

    SendUIAction('ui:start-contract', contract)
    SetNuiFocus(true, true)
end)

--- Send contract to buyer
---@param data { sellerId: number, buyerId: number, sellerName: string, buyerName: string, model: string, vehPlate: string, description: string, price: number }
---@return boolean
lib.callback.register('tgg-contracts:client:sendContractToBuyer', function(data)
    if not cache.vehicle then TaskStartScenarioInPlace(cache.ped, 'WORLD_HUMAN_CLIPBOARD', 0, false) end

    responseBuyer = nil
    local contract = {
        isSeller = false,
        buyerName = data.buyerName,
        buyerId = data.buyerId,
        sellerName = data.sellerName,
        sellerId = data.sellerId,
        vehicleModel = data.model,
        vehiclePlate = data.vehPlate,
        description = data.description,
        dealPrice = data.price,
    }

    SendUIAction('ui:start-contract', contract)
    SetNuiFocus(true, true)

    while not responseBuyer do Wait(0) end
    return responseBuyer
end)

-- NUI Callbacks

RegisterNUICallback("signContractSeller", function(data, cb)
    TriggerServerEvent("tgg-contracts:server:sendContractToBuyer", data)
    ClearPedTasks(cache.ped)
    SetNuiFocus(false, false)
    SendUIAction('ui:hide-contract')
    cb(1)
end)

RegisterNUICallback("signContractBuyer", function(_, cb)
    ClearPedTasks(cache.ped)
    SetNuiFocus(false, false)
    SendUIAction('ui:hide-contract')
    responseBuyer = true
    cb(1)
end)

RegisterNUICallback("close", function(_, cb)
    ClearPedTasks(cache.ped)
    SetNuiFocus(false, false)
    SendUIAction('ui:hide-contract')
    responseBuyer = false
    cb(1)
end)
