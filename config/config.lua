Config = {}

-- ============================= --
--- RECOMENDED TO LEAVE AS TRUE ---
-- ============================= --
Config.CheckForUpdates = true

-- Any vehicle model listed in this table will be considered blacklisted and restricted from transferring.
Config.BlacklistedVehicles = {
    `police`,
}

-- logs: Specifies the logging method to be used.
--       Possible values are 'discord' or 'ox_lib'.
--       'discord' - Logs will be sent to Discord.
--       'ox_lib'  - Logs will be sent with ox_lib.
Config.Logs = 'discord'

-- Determines whether the contract should be removed after it has been used.
Config.RemoveContractAfterTransfer = true

-- This variable represents the item for the contract.
Config.Item = 'contract'

Config.ContractDistance = 3.0
