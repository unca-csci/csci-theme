<?php

add_shortcode('people_card_list', 'shortcode_people_card_list');
function shortcode_people_card_list() {
    return '<div class="people-list"></div>' . 
    "\r\n" .
    '<script type="module" src="' . get_stylesheet_directory_uri() . '/assets/js/who-we-are.js"></script>'.
    "\r\n" .
    include_lightbox();
}

function displayPerson() {
    return include_lightbox() .
    '<script type="module">
        import DataManager from "'.get_stylesheet_directory_uri() . '/assets/js/data-manager.js";
        const dm = window.dataManager = new DataManager();

        async function showPerson(personId) {
            const el = document.querySelector("#person-main");
            const people = await dm.getPeople();
            const person = people.filter(person => personId === person.id)[0];
            console.log(person);
            el.innerHTML = person.getTemplate(false);
        }

        showPerson(' . get_the_ID() . ');
    </script>';
}

?>