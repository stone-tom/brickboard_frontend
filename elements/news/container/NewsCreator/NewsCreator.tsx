import React, { useState } from 'react';
import { useStoreDispatch } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';
import INewsItem from '../../../../models/INewsItem';
import { FlexRight } from '../../../../styles/global.styles';
import { createNews, updateNews } from '../../../../util/api';
import Button from '../../../core/components/Button/Button';
import File from '../../../core/components/File/File';
import FormInput from '../../../core/components/FormInput/FormInput';
import { NewsArticleImageWrapper, NewsArticleInfos } from '../../../landing/components/NewsArticle/NewsArticle.styles';
import {
  BtnCancelWrapper,
  CreatorContainer,
  NewsCreatorWrapper,
  UrlInfo,
  UrlWrapper,
  WideArea,
} from './NewsCreator.styles';

interface NewsCreatorProps {
  allowedTypes: string[];
  maxSize: number,
  onCreateNews?: ({ content }) => void;
  newsItem?: INewsItem;
  onCancel?: () => void;
  onUpdateNews?: ({ content }) => void;
}
const NewsCreator = ({
  allowedTypes,
  maxSize,
  onCreateNews,
  newsItem,
  onCancel,
  onUpdateNews,
}: NewsCreatorProps) => {
  const [file, setFile] = useState<File | null>();
  const [title, setTitle] = useState(newsItem ? newsItem.attributes.title : '');
  const [url, setUrl] = useState(newsItem ? newsItem.attributes.url : '');
  const [topic_url, setTopicUrl] = useState<string>(newsItem ? newsItem.attributes.topic_url : '');
  const [short_description, setShortDescription] = useState<string>(newsItem ? newsItem.attributes.short_description : '');
  const [allFields, setAllFields] = useState(false);

  const { setMessage } = useStoreDispatch();

  const submitNews = async () => {
    const newsData = new FormData();
    if (file) {
      newsData.append('news[news_banner]', file);
    }
    newsData.append('news[title]', title);
    newsData.append('news[short_description]', short_description);

    if (topic_url !== '' && topic_url !== null && topic_url !== undefined) {
      newsData.append('news[topic_url]', topic_url);
    }
    if (url !== '' && url !== null && url !== undefined) {
      newsData.append('news[url]', url);
    }
    let occuredError;
    if (newsItem) {
      const { content, error } = await updateNews(parseInt(newsItem.id, 10), newsData);
      occuredError = error;
      if (content) {
        setMessage({
          content: 'News wurden geupdated',
          type: MessageType.success,
        });
        onUpdateNews({ content });
      }
    } else {
      const { content, error } = await createNews(newsData, true);
      occuredError = error;
      if (content) {
        setMessage({
          content: 'News wurden erstellt',
          type: MessageType.success,
        });
        onCreateNews({ content });
      }
    }
    if (occuredError) {
      setMessage({
        content: 'Es ist ein Fehler aufgetreten',
        type: MessageType.error,
      });
    }
  };

  const handleFileUpload = (newFile: File) => {
    if (!allowedTypes.includes(newFile.type)) {
      setMessage({
        content: `Das Bild muss einen der folgenden Dateitypen haben: ${allowedTypes.join(' ')}`,
        type: MessageType.error,
      });
    } else if (newFile.size > maxSize) {
      setMessage({
        content: `Das Bild darf die Maximalgröße von ${maxSize / 1000}KB nicht übersteigen`,
        type: MessageType.error,
      });
    } else {
      setFile(newFile);
      setAllFields(true);
    }
  };
  return (
    <CreatorContainer>
      <NewsCreatorWrapper>
        <NewsArticleImageWrapper>
          <p>Bild * am besten 1920x1080px</p>
          <File onFileUpload={(newFile) => handleFileUpload(newFile)} />
        </NewsArticleImageWrapper>
        <NewsArticleInfos>
          <p>Überschrift *</p>
          <FormInput type="text" name="title" placeholder="Das Brickboard 2.0 ist gestartet!" onChange={(value) => setTitle(value)} defaultValue={newsItem && newsItem.attributes.title} />
          <p>Kurze Beschreibung *</p>
          <WideArea onChange={(value) => setShortDescription(value.target.value)} name="short_description" defaultValue={newsItem ? newsItem.attributes.short_description : ''} />
          <UrlWrapper>
            <UrlInfo>
              <p>Optional: Link zu Webseite</p>
              <FormInput type="text" name="url" placeholder="https://www.brickboard.de/" onChange={(value) => setUrl(value)} defaultValue={newsItem ? newsItem.attributes.url : ''} />
            </UrlInfo>
            <UrlInfo>
              <p>Optional: Teil-Url zum Thema</p>
              <FormInput type="text" name="topic_url" placeholder="https://www.brickboard.de/" onChange={(value) => setTopicUrl(value)} defaultValue={newsItem ? newsItem.attributes.topic_url : ''} />
            </UrlInfo>
          </UrlWrapper>
        </NewsArticleInfos>
      </NewsCreatorWrapper>
      <FlexRight>
        <Button disabled={!allFields && !newsItem} onClick={() => submitNews()}>
          Abschicken
        </Button>
        {newsItem && (
          <BtnCancelWrapper>
            <Button reset onClick={() => onCancel()}>
              Abbrechen
            </Button>
          </BtnCancelWrapper>
        )}
      </FlexRight>
    </CreatorContainer>

  );
};

export default NewsCreator;
