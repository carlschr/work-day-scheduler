//List of months
const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

//Uses moment to make a string of the current date
let date = `${months[moment().month()]} ${moment().date()}, ${moment().year()}`;

//Div to insert the schedule elements
const eventHolder = $('.container');

//Function for rendering the schedule inputs
const renderSchedule = () => {
    //Changes the currentDay text to the curent date
    $('#currentDay').text(date);

    //Clear the html within container
    eventHolder.html('');

    //Creates schedule blocks for the hours of 9 am to 5 pm
    for (let i = 9; i < 18; i++) {
        //Creates Bootstrap row and column
        let newRow = $(`<div class="row m-3"></div>`);
        let newCol = $(`<div class="col-12"></div>`);

        //Creates Bootstrap input group, text, and button inline
        let newInputGroup = $(`<div class="input-group input-group-lg"></div>`);
        let newInputPrepend = $(`<div class="input-group-prepend"><h1 class="input-group-text text-light " data-time="${i}">${i > 12 ? i - 12 + ' PM' : i + ' AM'}</h1></div>`);
        let newInput = $(`<input type="text" class="form-control text-center" aria-label="hour${i - 8}" aria-describedby="hour${i - 8}">`);
        let newInputAppend = $(`<div class="input-group-append"><button class="btn btn-dark" type="button" id="hour${i - 8}">+ | -</button></div>`);

        //Sets the placeholder equal to the saved data for the hour
        //If there is no data then the placeholder is an empty string
        newInput.attr('placeholder', `${localStorage.getItem('hour' + (i - 8)) ? localStorage.getItem('hour' + (i - 8)) : ''}`)

        //Adds click event for the button that adds the corresponding input value to local storage
        newInputAppend.on('click', (event) => {
            let inputButton = $(event.currentTarget).find('button');
            let inputBox = $(event.currentTarget).parent().find('input');
            localStorage.setItem(inputButton.attr('id'), inputBox.val());
            inputBox.attr('placeholder', `${inputBox.val()}`);
            inputBox.val('');
        });

        //Appends the elements in the proper structure
        eventHolder.append(newRow);
        newRow.append(newCol);
        newCol.append(newInputGroup);
        newInputGroup.append(newInputPrepend);
        newInputGroup.append(newInput);
        newInputGroup.append(newInputAppend);
    };
};

//Function for finding the relation between the current hour and another hour
const timeRelation = (hour) => {
    //The current hour
    let currentTime = moment().hour() + 12;

    //Returns a string describing the time of the event relative to the current hour
    if (+hour === currentTime) {
        return 'present';
    } else if (+hour < currentTime) {
        return 'past';
    } else {
        return 'future';
    };
};

//Function for updating the background colors on the schedule
const changeBackgroundColors = () => {
    //Object containing all input groups
    const scheduleGroups = $('.input-group');

    //Loops through the groups
    for (let i = 0; i < 9; i++) {
        //Variable for input-group
        let group = scheduleGroups[i];
        //Variable for h1 within input-group
        let groupText = $(group).find('.input-group-text');
        //Variable for data-time attribute
        let time = groupText.attr('data-time');

        //Calls timeColors using the data-time attribute value
        let relativeTime = timeRelation(time);

        //Removes the background classes before assigning new ones
        groupText.removeClass('bg-primary');
        groupText.removeClass('bg-danger');
        groupText.removeClass('bg-success');

        //Makes the past times red, the present time blue, and later times green
        if (relativeTime === 'present') {
            groupText.addClass('bg-primary');
        } else if (relativeTime === 'past') {
            groupText.addClass('bg-danger');
        } else {
            groupText.addClass('bg-success');
        };
    };
};

//Initial render
renderSchedule();
//Checks the hour every minute and sets the background colors
setInterval(changeBackgroundColors(), (60 * 1000));