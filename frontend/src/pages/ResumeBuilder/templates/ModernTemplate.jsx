export default function ModernTemplate({ resume }) {
  const p = resume.personalInfo || {};
  return (
    <div
      id="resume-preview"
      className="bg-white p-10 font-sans leading-relaxed"
    >
      <h1 className="text-4xl font-bold text-blue-700">{p.fullName}</h1>
      <p className="text-gray-600 mt-1">
        {p.email} • {p.phone} • {p.location}
      </p>
      <hr className="my-5" />

      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-700">Summary</h2>
          <p className="text-gray-800 mt-2">{resume.summary}</p>
        </section>
      )}

      {resume.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-700">Experience</h2>
          {resume.experience.map((e, i) => (
            <div key={i} className="mt-3">
              <div className="font-semibold text-lg">{e.role}</div>
              <div className="text-gray-600">{e.company}</div>
              <div className="text-gray-500 text-sm">
                {e.startDate} – {e.endDate}
              </div>
              <p className="mt-1 text-gray-800">{e.description}</p>
            </div>
          ))}
        </section>
      )}

      {resume.projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-700">Projects</h2>
          {resume.projects.map((p, i) => (
            <div key={i} className="mt-3">
              <div className="font-semibold text-lg">{p.title}</div>
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
        </section>
      )}

      {resume.skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-700">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {resume.skills.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {resume.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-blue-700">Education</h2>
          {resume.education.map((e, i) => (
            <div key={i} className="mt-2">
              <div className="font-semibold">{e.degree}</div>
              <div className="text-gray-600">{e.school}</div>
              <div className="text-gray-500 text-sm">
                {e.startDate} – {e.endDate}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
