fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
game 'gta5'
lua54 'yes'

name 'ne znam kak shte se kazvash'
description ''
author 'TeamsGG Development'
version '1.0.0'

ui_page "ui/build/index.html"

ox_libs {
    'locale',
}

shared_scripts {
    '@ox_lib/init.lua',
    'shared/init.lua',
    'config/*.lua'
}

client_script 'client/**/*.lua'

files {
    "ui/build/**/*",
    'locales/*.json',
    'data/audioexample_sounds.dat54.rel',
    'audiodirectory/teamsgg.awc'
}

data_file 'AUDIO_WAVEPACK' 'audiodirectory'
data_file 'AUDIO_SOUNDDATA' 'data/audioexample_sounds.dat'

server_scripts {
    'server/frameworks/*.lua',
    'server/*.lua'
}

escrow_ignore {
    "config/*",

    "client/custom/**/*",
    "server/frameworks/*"
}
