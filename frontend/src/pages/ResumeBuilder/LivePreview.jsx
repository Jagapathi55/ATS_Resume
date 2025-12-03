import MinimalTemplate from "./templates/MinimalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import SidebarTemplate from "./templates/SidebarTemplate";

export default function LivePreview({ resume }) {
  const template = resume.template || "minimal";

  const templates = {
    minimal: MinimalTemplate,
    modern: ModernTemplate,
    elegant: SidebarTemplate,
    sidebar: SidebarTemplate,
  };

  const SelectedTemplate = templates[template] || MinimalTemplate;

  return (
    <div id="resume-preview">
      <SelectedTemplate resume={resume} />
    </div>
  );
}
