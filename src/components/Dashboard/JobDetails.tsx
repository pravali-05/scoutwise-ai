interface JobDetailsProps {
  job_title: string;
  company_name: string;
  location: string;
  experience: string;
  salary: string;
  employment_type: string;
  skills: string[];
  email: string;
  website: string;
}

export default function JobDetails({
  job_title,
  company_name,
  location,
  experience,
  salary,
  employment_type,
  skills,
  email,
  website,
}: JobDetailsProps) {
  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">

      {/* Heading */}
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        📄 Job Information
      </h2>

      {/* Job Information */}
      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Job Title
          </p>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {job_title}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Company
          </p>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {company_name}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Location
          </p>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {location}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Experience
          </p>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {experience}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Salary
          </p>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {salary}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Employment Type
          </p>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {employment_type}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Email
          </p>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {email}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 dark:text-slate-400">
            Website
          </p>

          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="break-all text-blue-600 underline dark:text-blue-400"
          >
            {website}
          </a>
        </div>

      </div>

      {/* Skills */}
      <div className="mt-6">

        <p className="mb-3 text-gray-500 dark:text-slate-400">
          Required Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

    </div>
  );
}