let tags = [];
// set today's date
let today = new Date();
document.getElementById("eatenDate").value = today.toISOString().split("T")[0];

// photo preview
document.getElementById("recipePhoto").addEventListener("change", function() {
    let file = this.files[0];
    if (file) {
        document.getElementById("previewImg").src = URL.createObjectURL(file);
        document.getElementById("previewImg").style.display = "block";
        document.querySelector(".upload-overlay").style.display = "none";
        document.querySelector(".upload-card").classList.add("has-image");
    }
});

// journal toggle
document.getElementById("addToJournal").addEventListener("change", function() {
    if (this.checked) {
        document.getElementById("addToJournalRow").classList.add("hidden");
        document.getElementById("journalDetail").classList.add("visible");
    }
});

document.getElementById("eatenCheck").addEventListener("change", function() {
    this.checked = true;
    document.getElementById("journalDetail").classList.remove("visible");
    document.getElementById("addToJournalRow").classList.remove("hidden");
    document.getElementById("addToJournal").checked = false;
});

// draws the tag items from the tags array
function drawTags() {
    let box = document.getElementById("tagBox");
    let input = document.getElementById("tagInput");

    // remove all current tag items first
    let existingTags = document.getElementsByClassName("tag");
    while (existingTags.length > 0) {
        existingTags[0].parentNode.removeChild(existingTags[0]);
    }

    // add a new tag item for each tag in the array
    for (let i = 0; i < tags.length; i++) {
        let tagItem = document.createElement("span");
        tagItem.className = "tag";
        tagItem.innerHTML = tags[i] + ' <span class="remove" data-i="' + i + '">×</span>';
        box.insertBefore(tagItem, input);
    }
    // hide placeholder when tags exist, show it when empty
    if (tags.length > 0) {
        input.placeholder = "";
    } else {
        input.placeholder = "e.g healthy, homemade";
    }
}

// add tag on enter
document.getElementById("tagInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        let val = this.value.trim();
        let alreadyExists = false;
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] === val) {
                alreadyExists = true;
            }
        }
        if (val !== "" && alreadyExists === false) {
            tags[tags.length] = val;
            drawTags();
        }
        this.value = "";
    }
});

// remove tag when x is clicked
document.getElementById("tagBox").addEventListener("click", function(e) {
    if (e.target.className === "remove") {
        let index = Number(e.target.getAttribute("data-i"));
        let newTags = [];
        for (let i = 0; i < tags.length; i++) {
            if (i !== index) {
                newTags[newTags.length] = tags[i];
            }
        }
        tags = newTags;
        drawTags();
    }
});

// submit
document.getElementById("recipeForm").addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("Recipe:", document.getElementById("recipeTitle").value);
    console.log("Caption:", document.getElementById("recipeCaption").value);
    console.log("Tags:", tags);
});