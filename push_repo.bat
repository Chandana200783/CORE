@echo off
set GIT=C:\Users\Chandana\.gemini\mingit\cmd\git.exe
%GIT% config credential.helper ""
%GIT% remote set-url origin https://venupasumurthy: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@github.com/venupasumurthy/demomultirobotask.git
%GIT% push -u origin main --force
