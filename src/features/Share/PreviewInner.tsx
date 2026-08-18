import { Alert, Avatar } from '@lobehub/ui';
import dayjs from 'dayjs';
import { Suspense, lazy, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { FieldType } from '@/features/Share/type';
import { useGalleryObserver } from '@/hooks/useGalleryObserver';
import { useObserver } from '@/hooks/useObserver';

import { useStyles } from './style';

// Lazy-load: InfoBox pulls in shiki + its inlined wasm grammar engine (~600KB),
// which is only needed once the share preview is actually shown.
const InfoBox = lazy(() => import('@/modules/ImageInfo/features/InfoBox'));

export interface PreviewInnerProps extends FieldType {
  type: 'txt' | 'img';
}

const PreviewInner = memo<PreviewInnerProps>(
  ({ type, showConfig, showNegative, title, showAllImages }) => {
    const { image, images } = useGalleryObserver(`#${type}2img_gallery`);
    const value = useObserver(`#html_info_${type}2img .infotext`, { subSelector: 'p' });
    const { styles } = useStyles();
    const { t } = useTranslation();

    if (!image || image === 'undefined') {
      return (
        <div style={{ padding: 16 }}>
          <Alert message={t('shareModal.warn')} type={'warning'} />
        </div>
      );
    }
    return (
      <Flexbox gap={16} style={{ padding: 16 }}>
        {title && (
          <Flexbox align={'center'} gap={12} horizontal>
            <Avatar avatar={image} />
            <Flexbox>
              <div className={styles.title}>{title}</div>
              <div className={styles.desc}>{dayjs().format('YYYY-MM-DD')}</div>
            </Flexbox>
          </Flexbox>
        )}
        {showAllImages ? (
          images?.map((img, index) => (
            <img alt={'screenshot'} className={styles.img} key={index} src={img} width={'100%'} />
          ))
        ) : (
          <img alt={'screenshot'} className={styles.img} src={image} width={'100%'} />
        )}
        <Suspense fallback={null}>
          <InfoBox
            showConfig={showConfig}
            showCopy={false}
            showNegative={showNegative}
            value={value}
          />
        </Suspense>
      </Flexbox>
    );
  },
);

export default PreviewInner;
