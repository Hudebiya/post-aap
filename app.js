
var cardBg = "assets/img-1.jpg";
var editMode = false;
var editCard = null;

function selectImg(src) {
  cardBg = src;
  var bgImgs = document.getElementsByClassName("bgImg");
  for (var i = 0; i < bgImgs.length; i++) {
    bgImgs[i].className = "bgImg";
  }
  event.target.classList.add("selectedImg");
}

function post() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var posts = document.getElementById("posts");

  if (title.trim() && description.trim()) {
    if (editMode) {
      editCard.querySelector(".card-title").innerHTML = title;
      editCard.querySelector(".card-text").innerHTML = description;
      editCard.querySelector(".card-body").style.backgroundImage = "url('" + cardBg + "')";
      editMode = false;
      editCard = null;
      Swal.fire("Updated!", "Your post has been updated.", "success");
    } else {
      posts.innerHTML += `
        <div class="card m-2 shadow">
          <div style="background-image: url('${cardBg}');" class="card-body p-3">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
          </div>
          <div class="d-flex justify-content-end p-2">
            <button onclick="editPost(event)" class="btn btn-success btn-sm me-2">Edit</button>
            <button onclick="deletePost(event)" class="btn btn-danger btn-sm">Delete</button>
          </div>
        </div>`;
      Swal.fire("Posted!", "Your post has been added.", "success");
    }

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    document.getElementById("formDiv").style.display = "none";
    document.getElementById("postsSection").style.display = "block";
  } else {
    Swal.fire("Error", "Please enter title & description", "error");
  }
}

function deletePost(event) {
  var card = event.target.parentNode.parentNode;
  card.remove();
  Swal.fire("Deleted!", "Your post has been removed.", "success");
}

function editPost(event) {
  var card = event.target.parentNode.parentNode;
  var title = card.querySelector(".card-title").innerHTML;
  var desc = card.querySelector(".card-text").innerHTML;

  document.getElementById("title").value = title;
  document.getElementById("description").value = desc;

  document.getElementById("formDiv").style.display = "block";
  document.getElementById("postsSection").style.display = "none";

  editMode = true;
  editCard = card;

  Swal.fire("Edit Mode", "You can now edit your post.", "info");
}

function showForm() {
  document.getElementById("formDiv").style.display = "block";
  document.getElementById("postsSection").style.display = "none";
}

function changeTheme() {
  document.body.classList.toggle("dark-theme");
}
