# Google Calendar Clone

This is a full-stack clone of Google Calendar built with Next.js, Tailwind CSS, and SQLite.

## Setup and Run

1.  Install dependencies:

    ```bash
    npm install
    ```

2.  Run the development server:

    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

## Architecture and Technology Choices

- **Frontend**:
  - **Next.js**: A React framework for building server-side rendered and statically generated web applications.
  - **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
  - **date-fns**: A modern JavaScript date utility library.
- **Backend**:
  - **Next.js API Routes**: For building the backend APIs.
  - **SQLite**: A lightweight, serverless, self-contained, transactional SQL database engine.
- **Deployment**: The application is ready to be deployed on Vercel.

## Business Logic and Edge Cases

- **Event Creation**: Users can create events by clicking on a day in the month view. The event modal allows users to enter the event title, start time, and end time.
- **Event Viewing**: Events are displayed on the calendar in the month, week, and day views.
- **Navigation**: Users can navigate between months using the "Previous" and "Next" buttons. They can also go to the current date by clicking the "Today" button.
- **Views**: Users can switch between month, week, and day views.
- **Current Time Indicator**: In the day view, a red line indicates the current time.
- **Event Editing and Deletion**: Users can click and event to edit or delete it.
- **Event Overlap**: Handle event overlap conflicts.

## Future Enhancements

- **Recurring Events**: Add support for recurring events.
- **Drag and Drop**: Allow users to drag and drop events to reschedule them.
- **User Authentication**: Add user authentication to allow users to have their own calendars.
- **Reminders**: Implement event reminders.
