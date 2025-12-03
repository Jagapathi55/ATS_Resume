export default function MinimalTemplate({ resume }) {
  const p = resume.personalInfo || {};

  return (
    <div id="resume-preview" className="bg-white p-6 shadow rounded">
      {p.fullName && <h1 className="text-3xl font-bold">{p.fullName}</h1>}

      {(p.email || p.phone || p.location) && (
        <p className="text-gray-600 mt-1">
          {p.email} {p.phone && " • " + p.phone}{" "}
          {p.location && " • " + p.location}
        </p>
      )}

      <hr className="my-4" />

      {resume.summary && (
        <>
          <h2 className="font-semibold text-lg">Summary</h2>
          <p className="mt-1">{resume.summary}</p>
          <hr className="my-4" />
        </>
      )}

      {resume.experience?.length > 0 && (
        <>
          <h2 className="font-semibold text-lg">Experience</h2>
          {resume.experience.map((e, i) => (
            <div key={i} className="mt-1">
              <strong>{e.role}</strong>
              <div>{e.company}</div>
              <div className="text-sm text-gray-600">
                {e.startDate} - {e.endDate}
              </div>
              <p className="mt-1">{e.description}</p>
            </div>
          ))}
          <hr className="my-4" />
        </>
      )}

      {resume.projects?.length > 0 && (
        <>
          <h2 className="font-semibold text-lg">Projects</h2>
          {resume.projects.map((p, i) => (
            <div key={i} className="mt-1">
              <strong>{p.title}</strong>
              <div className="text-sm">{p.tech}</div>
              <p className="mt-1">{p.description}</p>
              {p.bullets?.length > 0 && (
                <ul className="list-disc ml-6 mt-1">
                  {p.bullets.map((b, x) => (
                    <li key={x}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <hr className="my-4" />
        </>
      )}

      {resume.skills?.length > 0 && (
        <>
          <h2 className="font-semibold text-lg">Skills</h2>
          <p className="text-gray-700">{resume.skills.join(" • ")}</p>
          <hr className="my-4" />
        </>
      )}

      {resume.education?.length > 0 && (
        <>
          <h2 className="font-semibold text-lg">Education</h2>
          {resume.education.map((e, i) => (
            <div key={i} className="mt-1">
              <strong>{e.degree}</strong>
              <div>{e.school}</div>
              <div className="text-sm">
                {e.startDate} - {e.endDate}
              </div>
            </div>
          ))}
          <hr className="my-4" />
        </>
      )}

      {resume.achievements?.length > 0 && (
        <>
          <h2 className="font-semibold text-lg">Achievements</h2>
          <ul className="list-disc ml-6">
            {resume.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
