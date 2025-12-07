export default function MinimalTemplate({ resume }) {
  const p = resume.personalInfo || {};

  return (
    <div className="bg-white p-6 shadow rounded" id="resume-preview">
      {p.fullName && <h1 className="text-3xl font-bold">{p.fullName}</h1>}

      {(p.email || p.phone || p.location) && (
        <p className="text-gray-600 mt-1">
          {[p.email, p.phone, p.location].filter(Boolean).join(" • ")}
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
                {(e.startDate || "") + " - " + (e.endDate || "")}
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
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  {p.bullets.map((b, x) => (
                    <li key={x}>
                      {typeof b === "string" ? (
                        b
                      ) : (
                        <>
                          <strong>{b.title || ""}</strong>
                          {b.details && (
                            <p className="ml-4 text-sm text-gray-700">
                              {b.details}
                            </p>
                          )}
                        </>
                      )}
                    </li>
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
          <p>{resume.skills.join(" • ")}</p>
          <hr className="my-4" />
        </>
      )}

      {resume.education?.length > 0 && (
        <>
          <h2 className="font-semibold text-lg">Education</h2>

          {resume.education.map((e, i) => {
            const degree = e.degree || e.title || "";
            const school = e.school || e.institute || e.university || "";
            const start = e.startDate || e.start || "";
            const end = e.endDate || e.end || "";
            const year = e.year || e.duration || "";

            return (
              <div key={i} className="mt-1">
                <strong>{degree}</strong>
                <div>{school}</div>

                <div className="text-sm text-gray-600">
                  {year ? year : [start, end].filter(Boolean).join(" - ")}
                </div>

                {e.details && (
                  <p className="text-sm text-gray-700 mt-1">{e.details}</p>
                )}
              </div>
            );
          })}

          <hr className="my-4" />
        </>
      )}
    </div>
  );
}
