if Config.Logs ~= 'ox_lib' then return end

Logs = {
    TransferVehicle = function(buyer, seller, vehModel, vehDescription, vehPrice, plate)
        lib.logger(seller, 'VEHICLE SALE',
            ('**Vehicle model:** %s \n**Vehicle description:** %s \n**Plate:** %s \n**Buyer identifier:** %s \n**Seller identifier:** %s \n**Price:** $%s'):format(vehModel, vehDescription, plate, buyer, seller, vehPrice))
    end
}
