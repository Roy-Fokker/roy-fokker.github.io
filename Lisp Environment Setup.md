# Getting started with Common Lisp on Windows 7/10 64bit

## Alternatives 
Listing these 1st incase you don't want to go through the hassle of setting up Emacs and Roswell
- [Portacle](https://portacle.github.io/):- Does not require installation of any of below. It's a self contained zip. Bit of duplication of tools if you already have Git or Emacs installed.
- [Sublime Text 3](https://www.sublimetext.com/3):- You'll need to install Roswell or SBCL
  - Packages
    - SublimeREPL
    - Paredit
    - BracketHighlighter
  - Add configuration for `Roswell`, if using Roswell, as follows 
    - Files are in `%APPDATA%\Roaming\Sublime Text 3\Packages\SublimeREPL\config\CommonLisp\`
    - Edit `Main.sublime-menu` by adding following on Line 15 after `"children":[`
      ```json
      { "command": "repl_open",
        "caption": "Roswell",
        "id": "repl_roswell",
        "mnemonic": "R",
        "args": {
          "type": "subprocess",
          "encoding": "utf8",
          "external_id": "lisp",
          "cmd": ["ros", "run"],
          "soft_quit": "\n(quit)\n",
          "cwd": "$folder",
          "cmd_postfix": "\n",
          "syntax": "Packages/Lisp/Lisp.tmLanguage"
          }
      },
      ```
    - Edit `Default.sublime-commands` by adding following on Line 2 after `[`
      ```json
      { "caption": "SublimeREPL: Roswell",
        "command": "run_existing_window_command", "args":
        {
          "id": "repl_roswell",
          "file": "config/CommonLisp/Main.sublime-menu"
        }
      },
      ```
- [VSCode](https://code.visualstudio.com/):- Again will need either Roswell or SBCL installed
  - Extensions
    - Lisp syntax highlight
    - Rainbow Brackets
    - SendToREPL:- There are several REPL extensions for VSCode, but I didn't like any of them. This one comes close, to Emacs like experience
  - Usage:- Open VSCode Terminal and start Lisp Repl from within VSCode


## Tools to download
- [Roswell - v 18.3.10.89 - x64](https://github.com/roswell/roswell/releases/download/v18.3.10.89/roswell_18.3.10.89_amd64.zip)
- [Emacs - v 26.1 - x64](http://ftp.gnu.org/gnu/emacs/windows/emacs-26/emacs-26.1-x86_64.zip)

## Setting up the tools
`Note:` Destination directory doesn't matter. Above is done to keep things together. `E:\Common_Lisp` is a Personal Preference. It could be `C:\BhelaBhela` or whichever path one is comfortable with. Only restriction seems to be spaces in directory name, in my experiments, roswell is unhappy with spaces in directory names.
### Setting up Roswell
- Extracting executables <br/>
  - Extract `roswell_18.3.10.89_amd64.zip` into `E:\Common_Lisp\Roswell` <br/>
  `Note:` Roswell, will put files into `%UserProfile%\.roswell`
- Adding Roswell to Windows PATH. <br/>
  Appended `E:\Common_Lisp\Roswell` to Windows PATH.
- Getting SBCL via Roswell. <br/>
  Open Command Prompt and execute <br/>
  `ros run` <br/>
  This will start roswell, and it will automatically download latest windows version of SBCL into `%UserProfile%\.roswell`. At time of this writing 1.4.2 for windows.

### Setting up Emacs
- Extracting zipped files
  - Extract `emacs-26.1-x86_64.zip` into `E:\Common_Lisp\Emacs` <br/>
    `Note:` Emacs, will put files into `%AppData%\Roaming\.emacs.d`
- Adding Emacs to Windows PATH. <br/>
  Appended `E:\Common_Lisp\Emacs` to Windows PATH.
- Creating shortcut <br/>
  To make things convinent, create shortcut in `E:\Common_Lisp\Emacs` to `E:\Common_Lisp\emacs\bin\runemacs.exe`
- Creating and configuring init.el for Emacs to execute on launch
  - Emacs on Windows expects to find `init.el` file in `%AppData%\Roaming\.emacs.d`.<br/>
    This file has to be created manually. 
  - File Open/Create command in Emacs is `Ctrl + x Ctrl + f` then typing the path of file you are interested in.<br/>
  For `init.el` this is `~/.emacs.d/init.el`
  - Configuring Package repository put following in `init.el` (at top of the file)
    ```emacs-lisp
    ;; Setup ELPA and MELPA
    (require 'package)
    (let* ((no-ssl (and (memq system-type '(windows-nt ms-dos))
                        (not (gnutls-available-p))))
          (proto (if no-ssl "http" "https")))
      ;; Comment/uncomment these two lines to enable/disable MELPA and MELPA Stable as desired
      (add-to-list 'package-archives (cons "melpa" (concat proto "://melpa.org/packages/")) t)
      ;;(add-to-list 'package-archives (cons "melpa-stable" (concat proto "://stable.melpa.org/packages/")) t)
      (when (< emacs-major-version 24)
            ;; For important compatibility libraries like cl-lib
            (add-to-list 'package-archives '("gnu" . (concat proto "://elpa.gnu.org/packages/")))))
    (package-initialize)
    ```
  - Save file with `Ctrl + x Ctrl + s`
- Installing Packages
  - Start Emacs
  - Do following `Alt + x` then type `package-list-package` then `Enter`. This refreshes local cache of available packages.
  - Packages in Emacs are installed by pressing `Alt + x` then typing in `package-install` then `Enter` followed by package name
    - Package Name: `slime`
    - Package Name: `auto-complete`
    - Package Name: `ac-slime`
    - Package Name: `use-package`
    - Package Name: `parinfer`
    - Package Name: `paredit`
    - Package Name: `rainbow-delimiters`
  - theme (optional)
    - Package Name: `spacemacs-theme`
- Configuring Emacs to use packages <br/>
  All of below are to be added to init.el bottom of the file. Remeber to save `Ctrl + x Ctrl + s`
  - Language/UTF-8 <br/>
    ```emacs-lisp
    ;; Set language locale and utf-8
    (set-language-environment "UTF-8")
    (setenv "LC_LOCALE" "en_US.UTF-8")
    (setenv "LC_CTYPE" "en_US.UTF-8")
    ```
  - Parenthesis highlighting (very useful for Lisp editing)<br/>
    ```emacs-lisp
    ;; Highlight parens
    (require 'paren)
    (show-paren-mode t)
    ```
  - SLIME configuration <br/>
    ```emacs-lisp
    ;; Configure Slime
    (require 'cl)
    (setq inferior-lisp-program "ros -Q run") ; set to roswell
    (require 'slime)
    (slime-setup '(slime-fancy))
    (setq slime-net-coding-system 'utf-8-unix)
    ```
  - Auto-complete and ac-slime configuration <br/>
    ```emacs-lisp
    ;; Configure auto-complete and ac-slime
    (ac-config-default)
    (add-hook 'slime-mode-hook 'set-up-slime-ac)
    (add-hook 'slime-repl-mode-hook 'set-up-slime-ac)
    (eval-after-load "auto-complete"
      '(add-to-list 'ac-modes 'slime-repl-mode))
    ```
  - Parinfer configration <br/>
    ```emacs-lisp
    ;; Configure parinfer
    (use-package parinfer
      :ensure t
      :bind (("C-," . parinfer-toggle-mode))
      :init (progn
        (setq parinfer-extensions
        '(defaults         ; should be included.
          pretty-parens   ; different paren styles for different modes.
          paredit         ; introduce some paredit commands.
          smart-tab       ; C-b & C-f jump positions and smart shift with tab & S-tab.
          smart-yank))    ; Yank behaviour depends on mode.
        (add-hook 'emacs-lisp-mode-hook #'parinfer-mode)
        (add-hook 'common-lisp-mode-hook #'parinfer-mode)
        (add-hook 'lisp-mode-hook #'parinfer-mode)))
    ```
  - Rainbow Delimiters configuration
    ```emacs-lisp
    ;; Rainbow delimiter
    (require 'rainbow-delimiters)
    (add-hook 'emacs-lisp-mode-hook 'rainbow-delimiters-mode)
    (add-hook 'common-lisp-mode-hook 'rainbow-delimiters-mode)
    (add-hook 'lisp-mode-hook 'rainbow-delimiters-mode)
    ```
  - Line Number display (optional) <br/>
    ```emacs-lisp
    ;; Show line numbers
    (add-hook 'find-file-hook 'linum-mode)
    ```
  - Theme selection (optional) <br/>
    Press `Alt + x` <br/>
    Type `customize-theme` <br/>
    This should bring up menu screen, where you can select the theme, including the `spacemacs-theme` which shows up as `spacemacs-dark` and `spacemacs-light`. <br/>
    Select the check box that interests you, and press `Save Theme Settings` button, and accept any `Warning dialog` telling you about dangers of theme scripts being dangerous.
- After all these changes to `init.el`, Emacs will need to be restarted, for file to be loaded properly. <br/>
  Internets says you can reload file using `Alt + x` `eval-buffer`. But this has produced mixed results, with many visual artifacts.

### Running SLIME REPL
Start Emacs and execute Slime package via following `Alt+x` followed by `slime`

### My frequently used Emacs shortcuts
- `TAB` in many places will allow/show auto-complete options.
- Create new file buffer :- `Ctrl+x Ctrl+f` followed by file directory and name. If file doesn't exist Emacs will create it on save.
- Save file buffer :- `Ctrl+x Ctrl+s`
- Close buffer: `Ctrl+x k` followed by buffer name
- Slime Specific Commands :- 
  - In Slime-REPL window/frame: pressing `,`[comma] will allow you to modify some repl environment settings. My frequent one is to change working directory of the REPL `,` then `change-directory`
  - `Ctrl+c Ctrl+c` compile current function/lisp form.
  - `Ctrl+c Ctrl+k` compiles whole file.
  - [Slime Documentation on Evaluation Commands](https://common-lisp.net/project/slime/doc/html/Evaluation.html#Evaluation)
- Emacs frame/window :-
  - `Ctrl+x 2` split current frame horizontally
  - `Ctrl+x 3` split current frame vertically
  - `Ctrl+x 1` Expand current frame
  - `Ctrl+x 0` remove current frame

