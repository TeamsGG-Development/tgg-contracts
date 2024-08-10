if not IsDuplicityVersion() then
    local NuiReady = false
    RegisterNUICallback('nui:ready', function(_, cb)
        NuiReady = true
        cb({})
    end)
end
