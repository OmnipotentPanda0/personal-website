import PageTemplate from "../components/PageTemplate";
import Link from "next/link";

function ContactPage() {
  return (
    <PageTemplate selected="Contact">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-8">
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl lg:text-4xl font-medium leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#2C3E50" }}
          >
            Contact
          </h1>
          <hr className="mt-4 mb-7 border-t-2 border-[#4A90E2] w-1/4 mx-auto" />
          <p
            className="text-lg md:text-xl lg:text-1xl font-medium leading-relaxed"
            style={{ fontFamily: "Roboto, sans-serif", color: "#2C3E50" }}
          >
            Here’s how you can reach me:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LinkedIn Card */}
          <Link
            href="https://www.linkedin.com/in/johannsetzer/"
            passHref
            target="_blank"
          >
            <div className="flex items-center p-6 border-2 border-[#4A90E2] bg-white/10 backdrop-blur-sm rounded-lg cursor-pointer transition-transform transform hover:scale-105 h-full">
              <img
                src="/images/linkedin.svg"
                alt="LinkedIn"
                className="w-10 h-10 mr-4"
              />
              <div>
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#2C3E50" }}
                >
                  LinkedIn
                </h2>
                <p style={{ color: "#2C3E50" }}>Johann Setzer</p>
              </div>
            </div>
          </Link>

          {/* Reddit Card */}
          <Link
            href="https://www.reddit.com/user/Johannbuild/"
            passHref
            target="_blank"
          >
            <div className="flex items-center p-6 border-2 border-[#4A90E2] bg-white/10 backdrop-blur-sm rounded-lg cursor-pointer transition-transform transform hover:scale-105 h-full">
              {/* Placeholder for Reddit Icon */}
              <div className="w-10 h-10 mr-4 flex items-center justify-center bg-orange-500 rounded-full flex-shrink-0">
                <svg
                  className="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.349 9.052c0-1.426-1.155-2.58-2.58-2.58s-2.58 1.154-2.58 2.58c0 1.425 1.155 2.58 2.58 2.58s2.58-1.155 2.58-2.58zm-5.437 3.626c.24-.24.374-.564.374-.903 0-.338-.134-.663-.374-.903-.24-.24-.564-.374-.903-.374-.34 0-.663.134-.903.374-.24.24-.374.565-.374.903 0 .34.134.663.374.903.24.24.564.374.903.374.34 0 .663-.134.903-.374zm-2.58-11.678c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm4.128 10.44c-.413.413-1.086.52-1.69.316.837-1.042.66-2.62-.54-3.82s-2.778-1.378-3.82-.54c-.203-.604-.1 1.277.315 1.69-.49.49-1.14.768-1.82.768-.68 0-1.33-.278-1.82-.768-.49-.49-.768-1.14-.768-1.82s.278-1.33.768-1.82c.49-.49 1.14-.768 1.82-.768.68 0 1.33.278 1.82.768.463-.93.187-2.086-.743-2.816-.93-.73-2.086-.454-2.816.476-.603-.25-1.26-.38-1.94-.38-1.58 0-3.02.62-4.1 1.7-1.08 1.08-1.7 2.52-1.7 4.1s.62 3.02 1.7 4.1c1.08 1.08 2.52 1.7 4.1 1.7s3.02-.62 4.1-1.7c1.08-1.08 1.7-2.52 1.7-4.1 0-.68-.13-1.34-.38-1.94z" />
                </svg>
              </div>
              <div>
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#2C3E50" }}
                >
                  Reddit
                </h2>
                <p style={{ color: "#2C3E50" }}>u/Johannbuild</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </PageTemplate>
  );
}

export default ContactPage;
