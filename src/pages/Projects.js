import React, { useState, useEffect } from "react";
import "../Projects.css"

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/projects") // Ensure backend is running
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
                setLoading(false);
            });
    }, []);

    return (
      <div className="container">
          <h1>Projects</h1>
          {loading ? (
              <p>Loading projects...</p>
          ) : (
              projects.map((project) => (
                  <div key={project.id} className="project-card">
                      <h3>{project.name}</h3>
                      <p><strong>Author:</strong> {project.author}</p>
                      <p><strong>Description:</strong> {project.description}</p>
                      <p><strong>Languages:</strong> {project.languages.join(", ")}</p>
                      <hr />
                  </div>
              ))
          )}
      </div>
  );
};

export default Projects;
