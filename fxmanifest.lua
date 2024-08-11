fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
game 'gta5'
lua54 'yes'

name 'tgg-contracts'
description ''
author 'TeamsGG Development'
version '1.0.0'

ui_page "ui/build/index.html"

ox_libs {
    'locale',
}

shared_scripts {
    '@ox_lib/init.lua',
    'shared/sh_main.lua',
    'config/*.lua'
}

client_script 'client/*.lua'

files {
    "ui/build/**/*",
}

server_scripts {
    'server/*.lua',
}

escrow_ignore {
    "*",
}
