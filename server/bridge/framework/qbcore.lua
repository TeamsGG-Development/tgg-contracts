if GetResourceState('qbx_core'):find('start') or not GetResourceState('qb-core'):find('start') then return end

lib.print.debug('Loading QBCore Framework')

QBCore = exports['qb-core']:GetCoreObject()
Framework = {
    GetPlayerFromId = function(source)
        local xPlayer = {}
        local qbPlayer = QBCore.Functions.GetPlayer(source)
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
            return qbPlayer.Functions.GetItemByName(item) ~= nil
        end
        return xPlayer
    end,

    RegisterUsableItem = function(item, cb)
        QBCore.Functions.CreateUseableItem(item, cb)
    end,

    DoesOwnTheVeh = function(identifier, plate)
        local result = MySQL.query.await('SELECT * FROM player_vehicles WHERE citizenid = ? AND plate = ?', {
            identifier, plate
        })

        return next(result) ~= nil
    end,

    UpdateOwner = function(plate, owner)
        return MySQL.update.await('UPDATE player_vehicles SET citizenid = ? WHERE plate = ?', {
            owner,
            plate
        })
    end,
}
