import { Theme, css } from 'antd-style';

/**
 * Styling for UI surfaces introduced by Forge Neo
 * (https://github.com/Haoming02/sd-webui-forge-classic) that never existed in
 * the upstream A1111 WebUI this theme was originally written against.
 *
 * Forge Neo ships these mostly as bare layout hooks — several carry no CSS of
 * its own at all — so without this module they fall through to unstyled Gradio
 * defaults and read as off-theme.
 *
 * Everything here is additive and scoped to Forge-Neo-only selectors, so it is
 * inert on classic A1111/Forge where these elements are never emitted.
 */
export default (token: Theme) => {
  return css`
    /* ------------------------------------------------------------------ *
     * Prompt layout modes (Settings > UI > Prompt Layout)
     *
     * Forge Neo can render the prompt box four ways: Default (the classic
     * #{tab}_toprow this theme already styles), Compact, Scrollable and
     * Accordion. All four build #{tab}_prompt_container, but only Compact and
     * Scrollable tag it with a class; Accordion just wraps it in a collapsible
     * panel. In Compact mode #{tab}_toprow is never created at all.
     * ------------------------------------------------------------------ */
    [id$='_prompt_container'] {
      gap: 8px;

      /* Wraps each of the positive / negative prompt textboxes. Forge Neo
         emits this class with no styling of its own. */
      .prompt-row {
        gap: 8px;
      }
    }

    /* Scrollable mode caps the prompt at a fixed height and scrolls it, so the
       textbox gets a visible edge the classic layout never had. */
    .prompt-container-scroll div.gradio-textbox.prompt {
      border-radius: ${token.borderRadius}px;
    }

    /* Compact mode moves the tool buttons and the styles dropdown into a single
       row beneath the prompts. Forge Neo only sets a margin on it. */
    div.toprow-compact-stylerow {
      gap: 8px;
      align-items: center;
      margin: 8px 0;
    }

    div.toprow-compact-tools [id$='2img_tools'] {
      flex-wrap: nowrap;
      gap: 4px;
    }

    /* ------------------------------------------------------------------ *
     * Extra-network pages
     *
     * These render inside this theme's Extra Network sidebar, so they need to
     * match the sidebar rather than the main content column.
     * ------------------------------------------------------------------ */
    .extra-page-prompts {
      gap: 8px;

      /* Forge Neo relocates the real prompt textboxes into this column when a
         page opts into per-page prompts, and flags it with -active. */
      &.extra-page-prompts-active {
        margin-bottom: 16px;
      }
    }

    /* ------------------------------------------------------------------ *
     * Extensions tab filter controls
     * ------------------------------------------------------------------ */
    .compact-checkbox-group div label {
      padding: 2px 8px !important;
      border-radius: ${token.borderRadius}px !important;
    }

    /* ------------------------------------------------------------------ *
     * Generation footer (time taken / VRAM / profiling)
     *
     * Forge Neo hardcodes "color: #444" on this block. Its child rules use
     * Gradio variables this theme already remaps, so only text sitting
     * directly in .performance inherits it — unreadable in dark mode.
     * ------------------------------------------------------------------ */
    .html-log .performance {
      gap: 8px;
      color: ${token.colorTextDescription};
    }
  `;
};
