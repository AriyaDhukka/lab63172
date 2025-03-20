import React, { useState } from "react";
import "../Skills.css";

const Skills = () => {
  // Define skills data
  const skillsData = {
    Skills: [
      "Java", "Python", "C/C++", "SQL", "JavaScript", "HTML", "PHP", "R", "C#"
    ],
    Frameworks: [
      "React.js", "Node.js", "JUnit", "Bootstrap"
    ],
    Tools: [
      "Git", "VS Code", "IntelliJ", "Unity", "Jira", "Confluence"
    ],
    Methods: [
      "Agile", "Scrum"
    ]
  };

  const [filter, setFilter] = useState("");

  // Function to filter skills based on input
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Function to filter and display skills that match the filter keyword
  const filteredSkills = (category) => {
    return skillsData[category].filter((skill) =>
      skill.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h2>Skills</h2>
      {/* Search bar to filter skills */}
      <input
        type="text"
        placeholder="Search skills..."
        value={filter}
        onChange={handleFilterChange}
        className="form-control mb-4"
      />
      
      {/* Display skills data in columns, but only show headings for categories with results */}
      <div className="skills-container">
        {/* Languages */}
        {filteredSkills("Skills").length > 0 && (
          <div className="skills-column">
            <h3>Languages</h3>
            <ul>
              {filteredSkills("Skills").map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Frameworks */}
        {filteredSkills("Frameworks").length > 0 && (
          <div className="skills-column">
            <h3>Frameworks</h3>
            <ul>
              {filteredSkills("Frameworks").map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tools */}
        {filteredSkills("Tools").length > 0 && (
          <div className="skills-column">
            <h3>Tools</h3>
            <ul>
              {filteredSkills("Tools").map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Methods */}
        {filteredSkills("Methods").length > 0 && (
          <div className="skills-column">
            <h3>Methods</h3>
            <ul>
              {filteredSkills("Methods").map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
