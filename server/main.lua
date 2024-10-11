---@class ContractData
---@field sellerId number
---@field buyerId number
---@field sellerName string
---@field buyerName string
---@field model string
---@field vehPlate string
---@field description string
---@field price number

Framework.RegisterUsableItem(Config.Item, function(source)
    local player = Framework.GetPlayerFromId(source)
    if not player then return end

    TriggerClientEvent('tgg-contracts:client:openContract', source)
end)

local function insertLog(buyer, seller, vehDescription, vehPrice, plate)
    return MySQL.insert.await('INSERT INTO `tgg-contracts` (buyer, seller, vehDescription, vehPrice, plate, date) VALUES (?, ?, ?, ?, ?, NOW())', {
        buyer,
        seller,
        vehDescription,
        vehPrice,
        plate
    })
end

--- Send contract to buyer
---@param data ContractData
RegisterNetEvent('tgg-contracts:server:sendContractToBuyer', function(data)
    local src = source
    local buyerSrc = data.buyerId
    local player = Framework.GetPlayerFromId(src)
    local buyer = Framework.GetPlayerFromId(buyerSrc)
    if not player or not buyer then return end

    local ownTheVehicle = Framework.DoesOwnTheVeh(player.identifier, data.vehPlate)
    if not ownTheVehicle then
        lib.notify(src, { id = 'not_owner', description = locale('not_owner'), type = 'error' })
        return
    end

    local buyerAccept = lib.callback.await('tgg-contracts:client:sendContractToBuyer', buyerSrc, data)

    if buyerAccept then
        if buyer.getAccount('bank').money < data.price then
            lib.notify(buyerSrc, { id = 'no_money', description = locale('no_money'), type = 'error' })
            lib.notify(src, { id = 'no_money', description = locale('buyer_no_money'), type = 'error' })
            return
        end

        if Config.RemoveContractAfterTransfer then
            if not player.hasItem(Config.Item) then -- prevent users from removing the item from their inventory while the buyer is accepting the contract
                return lib.notify(src, { id = 'no_contract', description = locale('no_contract'), type = 'error' })
            end
            player.removeInventoryItem(Config.Item, 1)
        end

        lib.notify(src, { id = 'contract_accepted', description = locale('accepted_contract'), type = 'success' })
        lib.notify(buyerSrc, { id = 'contract_accepted', description = locale('now_own_veh'), type = 'success' })

        Logs.TransferVehicle(buyer.identifier, player.identifier, data.model, data.description, data.price, data.vehPlate)

        buyer.removeAccountMoney('bank', data.price)
        player.addAccountMoney('bank', data.price)
        insertLog(buyer.identifier, player.identifier, data.description, data.price, data.vehPlate)
        Framework.UpdateOwner(data.vehPlate, buyer.identifier)
        Framework.GiveKeys(buyerSrc, data.vehPlate)
    else
        lib.notify(src, { id = 'contract_declined', description = locale('declined_contract'), type = 'error' })
    end
end)

lib.callback.register('tgg-contracts:server:getPlayerName', function(source, playerId)
    local player = Framework.GetPlayerFromId(playerId)
    if not player then return end

    return player.getName()
end)
