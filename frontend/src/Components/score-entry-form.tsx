

export default function ScoreEntryForm() {
    return (
    <form>
        <div>
            <label htmlFor="Course">Course</label><br />
            <input
                id="course"
                type="text"
            />
        </div>

        <div>
            <label htmlFor="Course Rating">Course Rating</label><br />
            <input
                id="course-rating"
                type="text"
            />
        </div>

        <div>
            <label htmlFor="Slope Rating">Slope Rating</label><br />
            <input
                id="slope-rating"
                type="text"
            />
        </div>

        <button type="submit">Submit</button>
    </form>
  );
}