import re
import os

dir_path = r"c:\Users\thaor\OneDrive\Documents\HCI-figma"
prototype_dir = os.path.join(dir_path, "prototype")
sidebar_folder = os.path.join(dir_path, "sidebar-header-footer")

header_file = os.path.join(sidebar_folder, "header.html")
sidebar_file = os.path.join(sidebar_folder, "sidebar.html")
footer_file = os.path.join(sidebar_folder, "footer.html")

# Load files
with open(header_file, "r", encoding="utf-8") as f:
    header_html = f.read()

with open(sidebar_file, "r", encoding="utf-8") as f:
    sidebar_html = f.read()

with open(footer_file, "r", encoding="utf-8") as f:
    footer_html = f.read()

def find_matching_div(html_content, start_pos):
    m = re.match(r'<([a-zA-Z0-9]+)', html_content[start_pos:])
    if not m:
        return -1
    tag_name = m.group(1)
    
    nest_level = 0
    search_idx = start_pos
    
    while search_idx < len(html_content):
        next_open = html_content.find(f"<{tag_name}", search_idx)
        next_close = html_content.find(f"</{tag_name}", search_idx)
        
        if next_open == -1 and next_close == -1:
            break
            
        if next_open != -1 and (next_close == -1 or next_open < next_close):
            nest_level += 1
            search_idx = next_open + len(tag_name) + 1
        else:
            nest_level -= 1
            search_idx = next_close + len(tag_name) + 3
            if nest_level == 0:
                return search_idx
                
    return -1

def extract_style_and_markup(html_content, tag_name):
    style_matches = re.findall(r'<style>(.*?)</style>', html_content, re.DOTALL)
    style_css = "\n".join(style_matches)
    
    tag_pattern = re.compile(rf'<{tag_name}\s+.*?>.*?</{tag_name}>', re.DOTALL)
    tag_match = tag_pattern.search(html_content)
    if not tag_match:
        tag_pattern = re.compile(rf'<{tag_name}>.*?</{tag_name}>', re.DOTALL)
        tag_match = tag_pattern.search(html_content)
        
    tag_markup = tag_match.group(0) if tag_match else ""
    return style_css, tag_markup

header_css, header_markup = extract_style_and_markup(header_html, "header")
sidebar_css, sidebar_markup = extract_style_and_markup(sidebar_html, "aside")
footer_css, footer_markup = extract_style_and_markup(footer_html, "footer")

# 1. Adapt Header CSS
header_css = header_css.replace("max-width: 1200px;", "max-width: 1180px !important; width: 1180px !important;")
header_css = header_css.replace(".header {", ".header {\n    width: 1180px !important;\n    max-width: 1180px !important;\n    box-sizing: border-box !important;\n    height: 60px;\n    background: #ffffff;\n    border-bottom: 1px solid #E2E8F0;\n    padding: 0 24px;")

# 2. Adapt Sidebar CSS
sidebar_css = sidebar_css.replace("width: 280px;", "width: 260px !important;")
sidebar_css = sidebar_css.replace("height: 100vh;", "align-self: stretch;")

# 3. Adapt Footer CSS
footer_css = footer_css.replace(".footer {", ".footer {\n    width: 1440px !important;\n    box-sizing: border-box !important;")
footer_css = footer_css.replace("max-width: 1200px;", "max-width: 1360px !important;")

# Namespace variables
var_replacements = {
    "text-dark": "text-dark-h",
    "text-muted": "text-muted-h",
    "icon-color": "icon-color-h",
    "bg-search": "bg-search-h",
    "bg-btn": "bg-btn-h",
    "border-light": "border-light-h",
    "noti-red": "noti-red-h",
    "avatar-grad": "avatar-grad-h",
    
    "dv-purple": "dv-purple-s",
    "text-color-base": "text-color-base-s",
    "active-item-bg": "active-item-bg-s",
    "active-item-text": "active-item-text-s",
    
    "footer-bg": "footer-bg-f",
    "footer-text-main": "footer-text-main-f",
    "footer-text-sub": "footer-text-sub-f",
    "icon-bg": "icon-bg-f",
}

for old_var, new_var in var_replacements.items():
    header_css = header_css.replace(f"--{old_var}:", f"--{new_var}:")
    sidebar_css = sidebar_css.replace(f"--{old_var}:", f"--{new_var}:")
    footer_css = footer_css.replace(f"--{old_var}:", f"--{new_var}:")
    
    header_css = header_css.replace(f"var(--{old_var})", f"var(--{new_var})")
    sidebar_css = sidebar_css.replace(f"var(--{old_var})", f"var(--{new_var})")
    footer_css = footer_css.replace(f"var(--{old_var})", f"var(--{new_var})")

combined_injected_css = f"""
/* Injected Sidebar, Header, Footer CSS */
{header_css}
{sidebar_css}
{footer_css}
"""

def apply_opacity_if_needed(tag_markup, original_block):
    if "opacity" in original_block or "0.5" in original_block:
        first_space = tag_markup.find(' ')
        if first_space != -1:
            style_idx = tag_markup.find('style="')
            if style_idx != -1 and style_idx < tag_markup.find('>'):
                insert_pos = style_idx + 7
                return tag_markup[:insert_pos] + "opacity: 0.5; " + tag_markup[insert_pos:]
            else:
                insert_pos = first_space
                return tag_markup[:insert_pos] + ' style="opacity: 0.5;"' + tag_markup[insert_pos:]
    return tag_markup

def get_custom_sidebar(sidebar_markup, filename):
    if "uc08" in filename:
        sidebar = sidebar_markup
        sidebar = sidebar.replace('<li class="nav-item active">\n        <span class="nav-icon">\n          <svg viewBox="0 0 24 24">\n            <rect x="4" y="4" width="6" height="6" rx="1.5"/>\n            <rect x="14" y="4" width="6" height="6" rx="1.5"/>\n            <rect x="4" y="14" width="6" height="6" rx="1.5"/>\n            <rect x="14" y="14" width="6" height="6" rx="1.5"/>\n          </svg>\n        </span>\n        <span class="nav-label">Hành trình</span>',
                                  '<li class="nav-item">\n        <span class="nav-icon">\n          <svg viewBox="0 0 24 24">\n            <rect x="4" y="4" width="6" height="6" rx="1.5"/>\n            <rect x="14" y="4" width="6" height="6" rx="1.5"/>\n            <rect x="4" y="14" width="6" height="6" rx="1.5"/>\n            <rect x="14" y="14" width="6" height="6" rx="1.5"/>\n          </svg>\n        </span>\n        <span class="nav-label">Hành trình</span>')
        sidebar = sidebar.replace('<!-- Mục Ôn tập (Sách mở kèm dải dấu trang) -->\n      <li class="nav-item">',
                                  '<!-- Mục Ôn tập (Sách mở kèm dải dấu trang) -->\n      <li class="nav-item active">')
        return sidebar
    return sidebar_markup

def find_component_bounds(html_str, tag_name, old_class, new_class):
    pattern_old = re.compile(r'<div\s+[^>]*class=["\'][^"\']*(?:' + re.escape(old_class) + r')[^"\']*["\'][^>]*>')
    match_old = pattern_old.search(html_str)
    if match_old:
        start_pos = match_old.start()
        end_pos = find_matching_div(html_str, start_pos)
        return start_pos, end_pos
        
    pattern_new = re.compile(r'<' + re.escape(tag_name) + r'\s+[^>]*class=["\'][^"\']*(?:' + re.escape(new_class) + r')[^"\']*["\'][^>]*>')
    match_new = pattern_new.search(html_str)
    if match_new:
        start_pos = match_new.start()
        end_pos = find_matching_div(html_str, start_pos)
        return start_pos, end_pos
        
    return -1, -1

def restructure_html_content(content, filename):
    comment_start = content.find("/* Injected Sidebar, Header, Footer CSS */")
    if comment_start != -1:
        style_end = content.find("</style>", comment_start)
        if style_end != -1:
            content = content[:comment_start] + content[style_end:]

    idx = 0
    replacements_made = 0
    while True:
        wrapper_match = re.search(r'<div\s+class="wf-layout-wrapper"', content[idx:])
        if not wrapper_match:
            break
            
        w_start = idx + wrapper_match.start()
        w_end = find_matching_div(content, w_start)
        if w_end == -1:
            idx = w_start + 30
            continue
            
        first_gt = content.find('>', w_start)
        wrapper_content = content[first_gt + 1:w_end - 6]
        
        h_start, h_end = find_component_bounds(wrapper_content, "header", "wf-header", "header")
        s_start, s_end = find_component_bounds(wrapper_content, "aside", "wf-sidebar", "sidebar")
        m_start, m_end = find_component_bounds(wrapper_content, "div", "wf-main-content", "wf-main-content")
        f_start, f_end = find_component_bounds(wrapper_content, "footer", "wf-footer", "footer")
        
        if m_start == -1 or m_end == -1:
            idx = w_end
            continue
            
        header_original = wrapper_content[h_start:h_end] if h_start != -1 else ""
        sidebar_original = wrapper_content[s_start:s_end] if s_start != -1 else ""
        footer_original = wrapper_content[f_start:f_end] if f_start != -1 else ""
        
        cur_header = apply_opacity_if_needed(header_markup, header_original)
        cur_sidebar = apply_opacity_if_needed(get_custom_sidebar(sidebar_markup, filename), sidebar_original)
        cur_footer = apply_opacity_if_needed(footer_markup, footer_original)
        
        existing_main = wrapper_content[m_start:m_end]
        
        new_inner = f"""
            <div class="wf-body-wrapper" style="display: flex; flex-direction: row; width: 1440px; flex-grow: 1;">
                {cur_sidebar}
                <div class="wf-right-col" style="display: flex; flex-direction: column; width: 1180px; flex-shrink: 0; box-sizing: border-box;">
                    {cur_header}
                    {existing_main}
                </div>
            </div>
            {cur_footer}
        """
        
        content = content[:first_gt + 1] + new_inner + content[w_end - 6:]
        idx = w_start + len(new_inner) + 30
        replacements_made += 1
        
    print(f"Restructured {replacements_made} screens in {os.path.basename(filename)}.")
    
    style_end = content.find("</style>")
    if style_end != -1:
        content = content[:style_end] + combined_injected_css + content[style_end:]
        
    # General wrapper CSS modifications
    content = content.replace("width: 1360px;", "width: 1440px !important;")
    content = content.replace(".wf-layout-wrapper { \n            display: flex; \n            flex-direction: column; \n            border: 1px solid rgba(155, 93, 224, 0.15); \n            background: var(--surface); \n            width: 1360px;", ".wf-layout-wrapper { \n            display: flex; \n            flex-direction: column; \n            border: 1px solid rgba(155, 93, 224, 0.15); \n            background: var(--surface); \n            width: 1440px !important;")
    
    return content

def main():
    files_to_process = [
        os.path.join(prototype_dir, "figma-uc5a.html"),
        os.path.join(prototype_dir, "figma-uc5b.html"),
        os.path.join(prototype_dir, "figma-uc08.html"),
        os.path.join(prototype_dir, "uc5b_prototype_grayscale.html"),
        os.path.join(prototype_dir, "uc08_prototype_grayscale.html")
    ]
    
    for filepath in files_to_process:
        if os.path.exists(filepath):
            print(f"Processing: {filepath}")
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
                
            new_content = restructure_html_content(content, filepath)
            
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
        else:
            print(f"File not found: {filepath}")

if __name__ == "__main__":
    main()
