let date;
    if (calendar.state.viewType === "timeGridDay") {
      date = moment(calendar.view.title).format("MMM D, YYYY");
    } else if (calendar.state.viewType === "timeGridWeek") {
      date =
        moment(calendar.view.activeStart).format("MMM D, YYYY") +
        " - " +
        moment(calendar.view.activeEnd)
          .subtract(1, "days")
          .format("MMM D, YYYY");
    } else if (calendar.state.viewType === "dayGridMonth") {
      date = moment(calendar.view.title).format("MMM, YYYY");
    }
