import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import useSWR from 'swr';
import {
  faEye,
  faEyeSlash,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import router from 'next/router';
import Layout from '../elements/core/container/Layout/Layout';
import getCategories from '../util/api/topic/get-categories';
import ICategory from '../models/ICategory';
import { CategoryContainer, CategoryEditor } from '../elements/categorypage/components/CategoryContainer/CategoryContainer.styles';
import FilterItem from '../elements/forum/components/FilterItem/FilterItem';
import { get } from '../util/methods';
import { activateCategory, backendURL, createCategory } from '../util/api';
import { FlexRight, MarginX } from '../styles/global.styles';
import ButtonComponent from '../elements/core/components/Button/Button';
import { useStoreDispatch, useStoreState } from '../context/custom_store';
import { MessageType } from '../models/IMessage';
import FormInput from '../elements/core/components/FormInput/FormInput';
import { CheckboxWrapper } from '../elements/news/container/NewsCreator/NewsCreator.styles';
import Restrictions from '../config/file_upload_restrictions.json';
import File from '../elements/core/components/File/File';

export const getStaticProps: GetStaticProps = async () => {
  const { content: categories, fetchURL } = await getCategories();
  return {
    props: {
      categories,
      fetchURL,
    },
    revalidate: 86400,
  };
};

const CategoryPage = ({ categories }: { categories: null | ICategory[] }) => {
  const { setMessage } = useStoreDispatch();
  const { data, mutate } = useSWR(
    `${backendURL}/categories`,
    get,
    { revalidateOnMount: true, initialData: categories },
  );
  const [chosenCats, setChosenCats] = useState<ICategory[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>();
  const [isActive, setIsActive] = useState(false);
  const [description, setDescription] = useState('');
  const { user: authUser } = useStoreState();
  if (authUser && !authUser.attributes.admin) router.push('/404');

  const addToChosen = (category) => {
    if (chosenCats.includes(category)) {
      setChosenCats([...chosenCats.filter((cat) => cat.id !== category.id)]);
    } else {
      chosenCats.push(category);
      setChosenCats([...chosenCats]);
    }
  };
  const activeCats = data.data.filter((cat: ICategory) => cat.attributes.is_active);
  const deactivatedCats = data.data.filter((cat: ICategory) => !cat.attributes.is_active);

  const activateCat = async (deactivate: boolean) => {
    for (const cat of chosenCats) {
      const { error } = await activateCategory(cat.id, deactivate);
      if (error) {
        setMessage({
          content: 'Fehler beim Speichern',
          type: MessageType.error,
        });
      } else {
        setMessage({
          content: `Kategorien ${deactivate ? 'deaktiviert' : 'aktiviert'}`,
          type: MessageType.success,
        });
        setChosenCats([]);
        mutate(data, true);
      }
    }
  };

  const handleFileUpload = (newFile: File) => {
    if (!Restrictions.allowed_file_types_badges.includes(newFile.type)) {
      setMessage({
        content: `Das Bild muss einen der folgenden Dateitypen haben: ${Restrictions.allowed_file_types_badges.join(' ')}`,
        type: MessageType.error,
      });
    } else if (newFile.size > Restrictions.max_size_badges) {
      setMessage({
        content: `Das Bild darf die Maximalgröße von ${Restrictions.max_size_badges / 1000}KB nicht übersteigen`,
        type: MessageType.error,
      });
    } else {
      setFile(newFile);
    }
  };

  const sendCategoryRequest = async () => {
    const catData = new FormData();
    if (file) {
      catData.append('category[badge_icon]', file);
    }
    catData.append('category[name]', name);
    catData.append('category[is_active]', isActive ? 'true' : 'false');
    catData.append('category[description]', description);

    const { content, error } = await createCategory(catData, false);
    if (content) {
      setMessage({
        content: 'Kategorie wurde erstellt',
        type: MessageType.success,
      });
      setIsEditing(false);
      data.data.push(content.data);
      mutate(data, false);
    }
    if (error) {
      setMessage({
        content: 'Es ist ein Fehler aufgetreten',
        type: MessageType.error,
      });
    }
  };

  return (
    <Layout title="Kategorien bearbeiten">
      <FlexRight>
        <ButtonComponent
          icon={isEditing ? faMinus : faPlus}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Abbrechen' : 'Kategorie erstellen'}
        </ButtonComponent>
        <MarginX>
          <ButtonComponent
            icon={faEye}
            disabled={chosenCats.length === 0}
            onClick={() => activateCat(false)}
          >
            Kategorien aktivieren
          </ButtonComponent>
        </MarginX>
        <ButtonComponent
          icon={faEyeSlash}
          disabled={chosenCats.length === 0}
          onClick={() => activateCat(true)}
        >
          Kategorien deaktivieren
        </ButtonComponent>
      </FlexRight>
      {isEditing && (
        <CategoryEditor>
          <FormInput placeholder="Name" type="text" name="title" onChange={(value) => setName(value)} />
          <FormInput placeholder="Kurzbeschreibung" type="text" name="Beschreibung" onChange={(value) => setDescription(value)} />
          <CheckboxWrapper>
            <label htmlFor="visible">
              <input type="checkbox" name="visible" id="visible" checked={isActive} onChange={() => setIsActive(!isActive)} />
              Aktiv
            </label>
          </CheckboxWrapper>
          <File onFileUpload={(newFile) => handleFileUpload(newFile)} />
          <ButtonComponent
            onClick={() => sendCategoryRequest()}
            disabled={
              !name
              || !file
            }
          >
            Abschicken
          </ButtonComponent>
        </CategoryEditor>
      )}
      <h2>Aktive Kategorien</h2>
      <CategoryContainer>
        {activeCats.length === 0 && <p>Keine Kategorien vorhanden</p>}
        {activeCats.map((category: ICategory) => (
          <FilterItem
            name={category.attributes.name}
            icon={category.attributes.category_icon}
            key={`cat_${category.id}`}
            active={chosenCats.includes(category)}
            onClick={() => addToChosen(category)}
          />
        ))}
      </CategoryContainer>
      <h2>Deaktivierte Kategorien</h2>
      <CategoryContainer>
        {deactivatedCats.length === 0 && <p>Keine Kategorien vorhanden</p>}
        {deactivatedCats.map((category: ICategory) => (
          <FilterItem
            name={category.attributes.name}
            icon={category.attributes.category_icon}
            key={`cat_${category.id}`}
            active={chosenCats.includes(category)}
            onClick={() => addToChosen(category)}
          />
        ))}
      </CategoryContainer>
    </Layout>
  );
};

export default CategoryPage;
