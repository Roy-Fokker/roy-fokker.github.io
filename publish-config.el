;;; publish.el --- Setup Org Publish
;;; Commentary:
;;  This file setups org publishing

;;; Code:

(require 'ox-publish)

(setq org-publish-project-alist
      '(
	("Swap Buffer"
	 :base-directory "d:/Projects/Web/roy-fokker.github.io/org/"
	 :base-extension "org"
	 :exclude "header.org"
	 :recursive t
	 :publishing-directory "d:/Projects/Web/roy-fokker.github.io/"
	 :publishing-function org-html-publish-to-html
	 :htmlize-output-type (quote css))))

(provide 'publish-config)
;;; publish-config.el ends here
