# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"

pin "bootstrap", to: "https://ga.jspm.io/npm:bootstrap@5.1.3/dist/js/bootstrap.esm.js"
pin "jquery", to: "https://code.jquery.com/jquery-3.6.0.min.js"
pin "@popperjs/core", to: "https://unpkg.com/@popperjs/core@2.10.2/dist/esm/popper.js"


pin_all_from "app/javascript/controllers", under: "controllers"
