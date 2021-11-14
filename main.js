
const apiSrc = './json-data/data.json';
let formsData = [];



const getData = async (src) => {
  try {
    let respons = await fetch(src);
    let parseRes = await respons.json();
    return parseRes;
  } catch (e) {
    showAlert()
  }
}

const showAlert = () => {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  const alertSec = document.querySelector('.alert-sec');
  if (formsData.length > 0) {
    alert.classList.add('alert-success');
    alert.innerHTML = `Success! You have ${formsData.length} form${formsData.length>1?'s':''} :)`;
  } else {
    alert.classList.add('alert-danger');
    alert.innerHTML = `Something went wrong :(`;
  }
  alert.innerHTML +=  `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`
  document.querySelector('.alert-sec').appendChild(alert);
}

const createInputs = (field, form) => {
  const newField = document.createElement('div');
  newField.classList.add('mb-3');
  newField.innerHTML = `<label for='${field.id}' class="form-label">${field.name}</label>
  ${field.type === 'textarea'?`<textarea rows="5" class="form-control"'id=${field.id}</textarea>` : ` <input type=${field.type} class="form-control" id=${field.id}>`}`;
  form.appendChild(newField);
}

const createForm = (formData, index) => {
  const newFormAcc = document.createElement('div');
  newFormAcc.classList.add('accordion-item');
  newFormAcc.innerHTML = `<h2 class="accordion-header" id="heading${index}">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
        ${formData.formName}
      </button></h2>
      <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionForms">
      <div class="accordion-body">
      </div>
    </div>
      `
  document.getElementById('accordionForms').appendChild(newFormAcc);
  const form = document.createElement('form');
  formData.fields.forEach(field => {
    createInputs(field, form);
  })
  const submitBtn = document.createElement('button');
  submitBtn.classList.add('btn', 'btn-primary');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Submit';
  form.appendChild(submitBtn);

  document.querySelector(`#collapse${index} .accordion-body`).appendChild(form);

}

const showAllForms = () => {
  const formsContainer = document.createElement('div');
  formsContainer.classList.add('row', 'forms-container');
  formsContainer.innerHTML = `<div class="accordion" id="accordionForms"></div>`
  document.querySelector('.container').appendChild(formsContainer);
  formsData.forEach((form, index) => {
    createForm(form, index);
  })
}



const generateForms = () => {
  if (!document.querySelector('.forms-container')) {
    getData(apiSrc)
      .then(res => formsData = res)
      .then(showAlert)
      .then(showAllForms)
  }
 
}


const generateBtn = document.querySelector('.generate-btn');
generateBtn.addEventListener('click', generateForms);