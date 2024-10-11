if not GetResourceState('qbx_core'):find('start') then return end

lib.print.debug('Loading QBox Framework')

Framework = {
    GetPlayerFromId = function(source)
        local xPlayer = {}
        local qbPlayer = exports.qbx_core:GetPlayer(source)
        ---------
        if not qbPlayer then
            return nil
        end
        xPlayer.identifier = qbPlayer.PlayerData.citizenid
        ---------
        xPlayer.getAccount = function(type)
            return {
                money = qbPlayer.Functions.GetMoney(type) or 0
            }
        end
        ---------
        xPlayer.addAccountMoney = function(type, money, reason)
            qbPlayer.Functions.AddMoney(type, money, reason)
        end
        ---------
        xPlayer.removeAccountMoney = function(type, money, reason)
            qbPlayer.Functions.RemoveMoney(type, money, reason)
        end
        ---------
        xPlayer.removeInventoryItem = function(item, count)
            qbPlayer.Functions.RemoveItem(item, count)
        end
        ---------
        xPlayer.getName = function()
            if qbPlayer.PlayerData.charinfo and qbPlayer.PlayerData.charinfo.firstname and qbPlayer.PlayerData.charinfo.lastname then
                return qbPlayer.PlayerData.charinfo.firstname .. " " .. qbPlayer.PlayerData.charinfo.lastname
            else
                return qbPlayer.PlayerData.name
            end
        end
        --------
        xPlayer.hasItem = function(item)
            return exports.ox_inventory:GetItemCount(source, item) > 0
        end
        return xPlayer
    end,

    RegisterUsableItem = function(item, cb)
        exports.qbx_core:CreateUseableItem(item, cb)
    end,

    DoesOwnTheVeh = function(identifier, plate)
        local result = MySQL.query.await('SELECT * FROM player_vehicles WHERE citizenid = ? AND plate = ?', {
            identifier, plate
        })

        return next(result) ~= nil
    end,

    UpdateOwner = function(plate, owner)
        local vehicleId = exports.qbx_vehicles:GetVehicleIdByPlate(plate)
        return exports.qbx_vehicles:SetPlayerVehicleOwner(vehicleId, owner)
    end,

    GiveKeys = function(source, plate)
        exports.qbx_vehiclekeys:GiveKeys(source, plate)
    end,
}
