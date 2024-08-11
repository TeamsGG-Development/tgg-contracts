if not IsDuplicityVersion() then
    local NuiReady = false
    RegisterNuiCallback('nui:ready', function(_, cb)
        NuiReady = true
        cb({})
    end)

    ---@param action string The action you wish to target
    ---@param data any The data you wish to send along with this action
    function SendUIAction(action, data)
        SendNUIMessage({
            action = action,
            data = data
        })
    end
end
