import { createStyles } from 'antd-style';

export const useStyles = createStyles(
  ({ css, token }, { headerHeight = 64, size = 86 }: { headerHeight?: number; size?: number }) => ({
    body: css`
      height: 100%;
      padding: 0;

      .hide {
        display: none;
      }

      /*
        Legacy WebUI exposed one search box per tab (#txt2img_extra_search).
        Forge Neo namespaces it per extra-network page instead
        (#txt2img_lora_extra_search, #txt2img_checkpoints_extra_search, ...),
        so match on the suffix to cover both. Safe to leave unscoped by tab:
        this whole block is already scoped to the sidebar body.
      */
      [id$='_extra_search'],
      #txt2img_extra_search,
      #img2img_extra_search {
        width: 100% !important;
        max-width: unset !important;

        textarea {
          height: unset !important;
        }
      }

      #txt2img-extra-network-sidebar,
      #img2img-extra-network-sidebar {
        /*
          Forge Neo replaced the single #{tab}_extra_sort dropdown with a row of
          per-page sort toggles (_extra_sort_path / _name / _date_created /
          _date_modified) plus a direction toggle (_extra_sort_dir).
        */
        button.lg.secondary.gradio-button,
        #txt2img_extra_sort,
        #img2img_extra_sort,
        [id*='_extra_sort'] {
          height: 34px !important;
          min-height: 34px !important;
        }

        .tabitem {
          position: relative;
          padding: 0 !important;
          background: transparent;
        }
      }

      .extra-network-pane {
        resize: none;
        height: 100%;
      }

      .extra-network-cards {
        overflow: hidden auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${size}px, 1fr));
        flex: none !important;
        gap: 8px;

        max-height: 100%;
        padding: 16px;
        border: unset !important;

        .name {
          background: unset !important;
        }

        .additional {
          position: relative !important;
        }

        &:has(.nocards) {
          display: flex;
          flex-direction: column;
        }
      }

      .extra-network-dirs {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding-inline: 16px;

        > button.lg.secondary.gradio-button {
          padding: 4px 8px;
          font-size: 12px;
          line-height: 1;
        }
      }

      .extra-networks {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;

        .pending {
          opacity: 1 !important;
        }

        .wrap.center.full.translucent {
          display: none !important;
        }

        .tab-nav {
          align-items: center;
          margin: 0;
          padding: 16px;

          > button {
            font-size: 14px !important;

            &:first-child {
              display: none;
            }
          }

          .extra-networks-controls-div {
            height: unset !important;
          }

          .extra-network-control {
            position: relative;
            flex: none;
            flex-wrap: wrap;
            gap: 8px;

            .extra-network-control--search {
              width: 100%;
            }

            small {
              display: none;
            }

            > div:has(i) {
              position: relative;

              display: flex;
              flex: none;

              height: 32px;
              border-radius: ${token.borderRadius}px;

              background: ${token.colorFillTertiary};
            }
          }
        }

        .extra-network-subdirs {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          align-items: center;

          margin-bottom: 12px;
          padding: 0 !important;

          > button {
            cursor: pointer;

            zoom: 0.8;

            flex: 1;

            min-width: 100px;
            margin: 0;
          }
        }

        .actions {
          background: rgb(0 0 0 / 30%);
          backdrop-filter: saturate(120%) blur(4px);
          box-shadow: none !important;

          .name {
            overflow: hidden;
            display: block;

            font-weight: bold;
            text-overflow: ellipsis;
            text-shadow: 0 1px 1px rgb(0 0 0 / 90%);
            white-space: nowrap;
          }

          .additional {
            position: absolute;
            display: none;

            > ul {
              display: flex;
              align-items: center;
              justify-content: center;

              margin: 0;
              padding: 0;

              a {
                margin: 0 !important;
                padding: 0 !important;

                font-size: var(--text-md) !important;
                color: #fff;
                text-overflow: ellipsis;
                text-shadow: 1px 1px black;
                white-space: nowrap;
              }
            }
          }

          .description {
            a:hover {
              color: var(--link-text-color-hover);
            }
          }
        }

        .card {
          overflow: hidden;

          width: 100% !important;
          height: ${size * 1.5}px !important;
          margin: 0 !important;
          border: 1px solid ${token.colorBorderSecondary};
          border-radius: ${token.borderRadiusSM}px;

          background-size: cover;
          outline: none;

          transition:
            box-shadow 200ms ${token.motionEaseOut},
            scale 400ms ${token.motionEaseOut};

          .name {
            font-size: var(--text-sm) !important;
          }

          &:hover {
            border-color: ${token.colorPrimary};
            box-shadow: 0 0 0 1px ${token.colorPrimary};

            .additional {
              display: flex !important;
            }

            .name {
              word-break: break-word;
              line-break: auto;
              white-space: unset;
            }
          }

          &:active {
            scale: 0.9;
          }
        }

        .button-row {
          padding: 0 4px;
          border-bottom-left-radius: ${token.borderRadius}px;
          background: rgba(0, 0, 0, 50%);

          > div {
            font-size: var(--text-md) !important;
            text-shadow: none !important;
          }
        }

        .metadata-button {
          &::before {
            content: 'ℹ️' !important;
          }
        }
      }

      /*
        Legacy WebUI wrapped the pages in #{tab}_extra_networks. Forge Neo drops
        that wrapper and puts the pages straight into #{tab}_extra_tabs, which is
        also the element this sidebar injects against (useInjectExtraNetwork).
      */
      div#txt2img_extra_networks,
      div#img2img_extra_networks,
      div#txt2img_extra_tabs,
      div#img2img_extra_tabs {
        display: block !important;

        /* Gradio's svelte-* hashes change on every release; match on the stable
           classes only so this keeps working across Gradio bumps. */
        .tabitem.gradio-tabitem {
          padding: 0 !important;
          background: transparent;
        }

        .search {
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          max-height: var(--button-lg-tool-height) !important;
          padding: 8px;
        }

        button {
          height: 32px !important;
        }
      }

      textarea {
        resize: none;
        overflow-y: hidden !important;
        font-family: ${token.fontFamily};
      }
    `,
    container: css`
      height: calc(100vh - ${headerHeight}px);
    `,
  }),
);
