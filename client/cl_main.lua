if not IsDuplicityVersion() then
    local NuiReady = false
    RegisterNUICallback('nui:ready', function(_, cb)
        NuiReady = true
        cb({})
    end)

    RegisterCommand('oc', function()
        local contract = {
            isSeller = true,
            buyerName = 'John Doe',
            sellerName = 'Jane Doe',
            vehicleModel = '2021 Tesla Model S',
            vehiclePlate = 'ABC123',
            dealPrice = 100000,
        }

        SendUIAction('ui:start-contract', contract)

        SetNuiFocus(true, true)
    end, false)

    RegisterCommand('cc', function()
        SendUIAction('ui:hide-contract')

        SetNuiFocus(false, false)
    end, false)
end
