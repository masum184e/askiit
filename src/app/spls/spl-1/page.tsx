import ProjectCard from "@/components/ProjectCard";

const Page = () => {
  const projects = [
    {
      banner: "https://images.unsplash.com/photo-1588990678968-c092c0f54f0d",
      name: "AI Recipe Assistant",
      github: "https://github.com/masumbillah/ai-recipe-assistant",
      live: "https://ai-recipe-app.vercel.app",
      description: "Chat-based app that suggests personalized recipes",
    },
    {
      banner: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64",
      name: "Portfolio Builder",
      github: "https://github.com/masumbillah/devfolio",
      live: "https://devfolio-web.netlify.app",
      description: "Drag-n-drop resume and portfolio generator",
    },
    {
      banner: "https://images.unsplash.com/photo-1674027392842-29f8354e236c",
      name: "E-Commerce Store",
      github: "https://github.com/masumbillah/nextshop",
      live: "https://nextshop-demo.vercel.app",
      description: "Fully functional Next.js e-commerce app with Stripe",
    },
    {
      banner: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
      name: "Realtime Chat App",
      github: "https://github.com/masumbillah/chatspace",
      live: "https://chatspace-beta.vercel.app",
      description: "Socket-powered group and private messaging",
    },
    {
      banner: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546",
      name: "Travel Blog CMS",
      github: "https://github.com/masumbillah/blogify",
      live: "https://blogify-travel.vercel.app",
      description: "Markdown-powered blog with admin dashboard",
    },
    {
      banner: "https://images.unsplash.com/photo-1610415220102-7807d3589b7a",
      name: "Task Manager Pro",
      github: "https://github.com/masumbillah/task-manager-pro",
      live: "https://taskmanagerpro.app",
      description: "Kanban-style project manager with dark mode",
    },
  ];

  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2 pb-4 scrollable-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Page;
