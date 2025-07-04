#!/bin/bash
cd /home/kavia/workspace/code-generation/petfinder-hub-107320-107329/frontend_pawsconnect
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

