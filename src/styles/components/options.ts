import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  .gradio-dropdown {
    .wrap,
    input {
      cursor: pointer;
    }

    .container .wrap {
      .wrap-inner input {
        font-size: var(--text-sm);
        line-height: 0;
      }
    }

    /*
      Multiselect Dropdowns (e.g. Forge Neo's "VAE / Text Encoder") wrap their
      chevron in .icon-wrap, an SVG sized width:100%/height:100% of that
      wrapper. Gradio's own compiled CSS for it only ever constrains width, not
      height -- if the wrapper ends up in a flex row that stretches its
      cross-axis (or its ResizeObserver-driven layout measures against a
      stale/huge size after this theme reparents #quicksettings, see
      useInject), the icon can balloon into a layout-breaking triangle that
      also intercepts clicks meant for neighboring fields. Bound both
      dimensions explicitly so that can't happen. Scoped to .gradio-dropdown:
      .icon-wrap is also used by unrelated components (e.g. the Upload
      dropzone) that intentionally render it much larger.
    */
    .icon-wrap {
      display: flex !important;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;

      width: 20px !important;
      height: 20px !important;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    /* Multiselect chip row: let it wrap and shrink instead of forcing the
       sidebar wider or overflowing when many modules are selected. */
    .wrap-inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      min-width: 0;
    }

    .secondary-wrap {
      display: flex;
      flex: 1;
      align-items: center;
      min-width: 0;
    }

    .token {
      overflow: hidden;
      max-width: 100%;
      text-overflow: ellipsis;
    }
  }

  .dropdown-arrow {
    margin: 0 !important;
  }

  ul.options {
    display: block !important;

    margin: 0 !important;
    padding: 4px !important;
    border: 1px solid ${token.colorBorder} !important;
    border-radius: ${token.borderRadius}px !important;

    background: ${token.colorBgElevated} !important;
    box-shadow: ${token.boxShadow};

    li {
      overflow: hidden;
      display: block !important;

      padding: 4px 8px !important;
      border-radius: ${token.borderRadiusSM}px !important;

      line-height: 1 !important;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.selected {
        color: ${token.colorText} !important;
        background: ${token.colorFill} !important;
      }

      &.active:not(.selected) {
        color: black !important;
        background: ${token.yellow} !important;
      }

      &:hover {
        color: ${token.colorText} !important;
        background: ${token.colorFillSecondary} !important;
      }
    }
  }
`;
