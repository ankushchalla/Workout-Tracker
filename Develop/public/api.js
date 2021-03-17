const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json;
  },
  async addExercise(data) {
    // const id = location.search.split("=")[1];
    const res = await fetch("/api/workouts/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  // Creates a unique workout document in the Workouts collection.
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    // The range is always 7. 
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
