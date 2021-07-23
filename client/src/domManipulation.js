module.exports.addClass = (id, cl) => {
  var el = document.getElementById(id);
  if (el) {
    el.classList.add(cl);
  }
};

module.exports.removeClass = (id, cl) => {
  var el = document.getElementById(id);
  if (el) {
    el.classList.remove(cl);
  }
};

module.exports.setInnerHTML = (id, inner) => {
  var el = document.getElementById(id);
  if (el) {
    el.innerHTML = inner;
  }
};
