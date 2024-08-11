if not GetResourceState('es_extended'):find('start') then return end

lib.print.debug('Loading ESX Framework')

ESX = exports.es_extended:getSharedObject()
Framework = ESX

Framework.DoesOwnTheVeh = function(identifier, plate)
    local result = MySQL.query.await('SELECT * FROM owned_vehicles WHERE owner = ? AND plate = ?', {
        identifier, plate
    })

    return next(result) ~= nil
end

Framework.UpdateOwner = function(plate, owner)
    return MySQL.update.await('UPDATE player_vehicles SET owner = ? WHERE plate = ?', {
        owner,
        plate
    })
end
