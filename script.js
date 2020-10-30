//List of months
const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

//Uses moment to make a string of the current date
let date = `${months[moment().month()]} ${moment().date()}, ${moment().year()}`;

//Div to insert the schedule elements
const eventHolder = $('.container');

//Function for rendering the schedule inputs
const renderSchedule = () => {
    for (let i = 9; i < 18; i++) {
        //Creates Bootstrap row and column
        let newRow = $(`<div class="row"></div>`);
        let newCol = $(`<div class="col-12"></div>`);
        //Creates bootsrap input group, text, and button inline
        let newInputGroup = $(`<div class="input-group input-group-lg"></div>`);
        let newInputPrepend = $(`<div class="input-group-prepend"><h1 class="input-group-text bg-primary text-light">${i > 12 ? i - 12 + ' PM' : i + ' AM'}</h1></div>`);
        let newInput = $(`<input type="text" class="form-control" aria-label="hour${i - 8}" aria-describedby="hour${i - 8}">`);
        let newInputAppend = $(`<div class="input-group-append"><button class="btn btn-outline-secondary" type="button" id="hour${i - 8}">+</button></div>`);

        //Appends the elements in the proper structure
        eventHolder.append(newRow);
        newRow.append(newCol);
        newCol.append(newInputGroup);
        newInputGroup.append(newInputPrepend);
        newInputGroup.append(newInput);
        newInputGroup.append(newInputAppend);
    };
};

//Initial render
renderSchedule();