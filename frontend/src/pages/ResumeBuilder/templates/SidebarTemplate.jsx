export default function SidebarTemplate({ resume }) {
  const p = resume.personalInfo || {};

  return (
    <div id="resume-preview" className="flex bg-white">
      <div className="w-1/3 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold">{p.fullName}</h1>
        <p className="text-gray-700 mt-2">{p.email}</p>
        <p className="text-gray-700">{p.phone}</p>
        <p className="text-gray-700">{p.location}</p>

        {resume.skills?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Skills</h2>
            <ul className="list-disc ml-5 mt-2 text-gray-700">
              {resume.skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {resume.education?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Education</h2>
            {resume.education.map((e, i) => (
              <div key={i} className="mt-2 text-gray-700">
                <strong>{e.degree}</strong>
                <div>{e.school}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-2/3 p-8">
        {resume.summary && (
          <>
            <h2 className="text-xl font-bold">Summary</h2>
            <p className="mt-2 text-gray-700">{resume.summary}</p>
            <hr className="my-4" />
          </>
        )}

        {resume.experience?.length > 0 && (
          <>
            <h2 className="text-xl font-bold">Experience</h2>
            {resume.experience.map((e, i) => (
              <div key={i} className="mt-3">
                <strong>{e.role}</strong>
                <div>{e.company}</div>
                <div className="text-sm text-gray-500">
                  {e.startDate} – {e.endDate}
                </div>
                <p className="mt-1">{e.description}</p>
              </div>
            ))}
            <hr className="my-4" />
          </>
        )}

        {resume.projects?.length > 0 && (
          <>
            <h2 className="text-xl font-bold">Projects</h2>
            {resume.projects.map((p, i) => (
              <div key={i} className="mt-3">
                <strong>{p.title}</strong>
                <div className="text-gray-600">{p.tech}</div>
                {p.bullets?.length > 0 && (
                  <ul className="list-disc ml-6 mt-2">
                    {p.bullets.map((b, x) => (
                      <li key={x}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
