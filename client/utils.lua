local utils = {}

---@param coords vector3
---@return number|nil
function utils.findNearbyPlayer(coords)
    -- Credit to ox_inventory for this function
    local nearbyPlayers = lib.getNearbyPlayers(coords, Config.ContractDistance, false)
    local nearbyCount = #nearbyPlayers

    if nearbyCount == 0 then return end

    if nearbyCount == 1 then
        local player = nearbyPlayers[1]
        local playerId = GetPlayerServerId(player.id)

        return playerId
    end

    local playerList, n = {}, 0
    for i = 1, #nearbyPlayers do
        local player = nearbyPlayers[i]
        local playerName = GetPlayerName(player.id)
        player.id = GetPlayerServerId(player.id)
        ---@diagnostic disable-next-line: inject-field
        player.icon = 'user'
        ---@diagnostic disable-next-line: inject-field
        player.title = ('[%s] %s'):format(player.id, playerName)
        ---@diagnostic disable-next-line: inject-field
        player.onSelect = function()
            return player.id
        end
        n += 1
        playerList[n] = player
    end

    if n == 0 then return end

    local selectedPlayer
    lib.registerContext({
        id = 'tgg-contracts:contractPlayerList',
        title = 'Nearby Players',
        options = playerList,
    })

    lib.showContext('tgg-contracts:contractPlayerList')

    return selectedPlayer
end

return utils
