local latestVersion = nil
local repoName = 'tgg-something-versions'

AddEventHandler('onResourceStart', function(resourceName)
    if resourceName ~= GetCurrentResourceName() or not Config.CheckForUpdates then return end

    local currentVersion = GetResourceMetadata(resourceName, 'version', 0)
    if currentVersion then
        currentVersion = currentVersion:match('%d+%.%d+%.%d+')
    end

    if not currentVersion then
        return print(("^1Unable to determine current resource version for '%s' ^0"):format(
            resourceName))
    end

    PerformHttpRequest(('https://api.github.com/repos/TeamsGG-Development/' .. repoName .. '/releases/latest'),
        function(status, response)
            if status ~= 200 then return end

            response = json.decode(response)
            if response.prerelease then return end

            latestVersion = response.tag_name:match('%d+%.%d+%.%d+')

            if not latestVersion or latestVersion == currentVersion then return end

            local cv = { string.strsplit('.', currentVersion) }
            local lv = { string.strsplit('.', latestVersion) }

            for i = 1, #cv do
                local current, minimum = tonumber(cv[i]), tonumber(lv[i])

                if current ~= minimum then
                    if current < minimum then
                        return print(('^4⤴️ An update is available for %s (current ^1v%s^4, latest ^2v%s^4)^0 🆙')
                            :format(
                                resourceName,
                                currentVersion,
                                latestVersion))
                    else
                        break
                    end
                end
            end
        end, 'GET')
end)
