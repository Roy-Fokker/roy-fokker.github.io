;;; publish.el --- Setup Org Publish
;;; Commentary:
;;  This file setups org publishing

;;; Code:

(require 'org-publish)
(setq org-publish-project-alist
      `(("Swap Buffer"
         :base-directory "../org/"
	 :base-extension "org"
	 :exclude "header.org"
         :recursive t
         :publishing-directory "../"
         :publishing-function org-html-publish-to-html)))
