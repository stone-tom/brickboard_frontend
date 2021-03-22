import React, { useState } from 'react';
import { useStoreDispatch } from '../../../../context/custom_store';
import { MessageType } from '../../../../models/IMessage';
import { createNews } from '../../../../util/api';
import Button from '../../../core/components/Button/Button';
import File from '../../../core/components/File/File';
import FormInput from '../../../core/components/FormInput/FormInput';
import { NewsCreatorWrapper } from './NewsCreator.styles';

interface NewsCreatorProps {
  allowedTypes: string[];
  maxSize: number,
  onCreateNews: any;
}
const NewsCreator = ({ allowedTypes, maxSize, onCreateNews }: NewsCreatorProps) => {
  const [file, setFile] = useState<File | null>();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [topic_url, setTopicUrl] = useState('');
  const [short_description, setShortDescription] = useState();

  const { setMessage } = useStoreDispatch();

  const submitNews = async () => {
    const newsData = new FormData();
    newsData.append('news[news_banner]', file);
    newsData.append('news[title]', title);
    newsData.append('news[short_description]', short_description);
    const { content, error } = await createNews(newsData, true);
    if (error) {
      setMessage({
        content: 'Es ist ein Fehler aufgetreten',
        type: MessageType.error,
      });
    }
    if (content) {
      setMessage({
        content: 'News wurden erstellt',
        type: MessageType.success,
      });
      console.log("RECEIVED THIS CONTENT");
      console.log(content);
      onCreateNews({ content });
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
    }
  };
  return (
    <NewsCreatorWrapper>
      <File onFileUpload={(newFile) => handleFileUpload(newFile)} />
      <p>Überschrift</p>
      <FormInput type="text" name="title" placeholder="Das Brickboard 2.0 ist gestartet!" onChange={(value) => setTitle(value)} />
      <p>Kurze Beschreibung</p>
      <textarea onChange={(value) => setShortDescription(value.target.value)} name="short_description" />
      <p>Optional: Link zu Webseite</p>
      <FormInput type="text" name="url" placeholder="https://www.brickboard.de/" onChange={(value) => setUrl(value.toString())} />
      <p>Optional: Teil-Url zum Thema</p>
      <FormInput type="text" name="topic_url" placeholder="https://www.brickboard.de/" onChange={(value) => setUrl(value.toString())} />
      <Button onClick={() => submitNews()}>Abschicken</Button>
    </NewsCreatorWrapper>
  );
};

export default NewsCreator;
