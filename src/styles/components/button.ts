import { Theme, css } from 'antd-style';

export default (token: Theme) => css`
  button {
    cursor: pointer;
    min-width: fit-content !important;

    &.gradio-button {
      &.tool:not(.hidden) {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 36px;
        min-width: 36px !important;
        max-width: 36px !important;
        height: var(--button-lg-tool-height);
        min-height: var(--button-lg-tool-height) !important;
        max-height: var(--button-lg-tool-height);
        padding: 0;
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;

        font-size: var(--text-md);
        line-height: 1;

        background: ${token.colorFillSecondary};

        &:hover {
          background: ${token.colorFill};
        }

        &.secondary,
        &.primary {
          overflow: hidden;
          flex: 1;

          font-size: var(--text-md);
          line-height: 1;
          text-overflow: ellipsis;

          &:active {
            box-shadow: ${token.boxShadowSecondary};
          }
        }
      }

      &.secondary {
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px !important;
        font-weight: 500;
        background: ${token.colorFillTertiary};

        &:hover {
          border-color: ${token.colorBorder};
          color: ${token.colorText};
          background: ${token.colorFill};
        }
      }

      &:not(.tool, .svelte-1p4r00v) {
        &.primary,
        &.secondary {
          &.lg {
            height: var(--button-lg-height) !important;
            min-height: var(--button-lg-height) !important;
            max-height: var(--button-lg-height) !important;
          }
        }
      }

      &[id$='_generate'] {
        height: var(--button-lg-height) !important;
        min-height: var(--button-lg-height) !important;
        max-height: var(--button-lg-height) !important;
      }

      /*
        Forge Neo added a third generate-box state: after clicking Interrupt it
        swaps in an "Interrupting..." button (#{tab}_interrupting) that occupies
        the same slot. [id$='_interrupt'] does not match it, so it needs to be
        listed explicitly or it renders unstyled mid-generation.
      */
      &[id$='_interrupt'],
      &[id$='_interrupting'] {
        min-width: 0;
        border: 1px solid ${token.colorError};
        border-right: none !important;
        border-radius: ${token.borderRadius}px 0 0 ${token.borderRadius}px !important;

        color: var(--button-cancel-text-color) !important;

        background: ${token.colorError} !important;

        &:hover,
        &:active {
          border: 1px solid ${token.colorErrorHover};
          background: ${token.colorErrorHover} !important;
        }
      }

      &[id$='_skip'] {
        min-width: 0;
        border-radius: 0 ${token.borderRadius}px ${token.borderRadius}px 0 !important;
        background: ${token.colorBorderSecondary} !important;

        &:hover,
        &:active {
          background: ${token.colorBorder} !important;
        }
      }

      &#interrogate,
      &#deepbooru {
        height: auto !important;
        max-height: fit-content !important;

        font-size: 14px;
        line-height: inherit;
        white-space: break-spaces;
      }
    }
  }

  div[id^='image_buttons_'] {
    flex-wrap: wrap;

    button.gradio-button.tool {
      flex: 1;
      max-width: max(36px, 100%) !important;
      font-size: var(--text-md) !important;
    }
  }
`;
