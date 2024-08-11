fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
game 'gta5'
lua54 'yes'

name 'tgg-contracts'
description 'Vehicle contracts to sell vehicles to other players.'
author 'TeamsGG Development'
version '1.0.0'

ui_page 'ui/build/index.html'

ox_libs {
    'locale',
}

shared_scripts {
    '@ox_lib/init.lua',
    'shared/init.lua',
    'config/*.lua'
}

client_script 'client/*.lua'

files {
    'locales/*.json',
    'ui/build/**/*',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/**/*.lua',
}

escrow_ignore {
    '*',
}

dependencies {
    '/server:6116',
    '/onesync',
    'oxmysql',
    'ox_lib',
}
