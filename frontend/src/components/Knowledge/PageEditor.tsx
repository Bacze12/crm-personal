import React, { useState } from 'react';
import { Plus, Type, List, Code, Image, Database, Bold, Italic, Link } from 'lucide-react';
import { Block } from '../../types';
import Button from '../UI/Button';

interface PageEditorProps {
  title: string;
  content: Block[];
  onTitleChange: (title: string) => void;
  onContentChange: (content: Block[]) => void;
}

const blockTypes = [
  { type: 'paragraph', icon: Type, label: 'Texto' },
  { type: 'heading', icon: Type, label: 'Título' },
  { type: 'list', icon: List, label: 'Lista' },
  { type: 'code', icon: Code, label: 'Código' },
  { type: 'image', icon: Image, label: 'Imagen' },
  { type: 'database', icon: Database, label: 'Base de Datos' },
];

const PageEditor: React.FC<PageEditorProps> = ({ title, content, onTitleChange, onContentChange }) => {
  const [showBlockMenu, setShowBlockMenu] = useState<number | null>(null);

  const addBlock = (afterIndex: number, type: Block['type']) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: '',
      properties: {},
      children: [],
    };

    const newContent = [...content];
    newContent.splice(afterIndex + 1, 0, newBlock);
    onContentChange(newContent);
    setShowBlockMenu(null);
  };

  const updateBlock = (blockId: string, updates: Partial<Block>) => {
    const newContent = content.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );
    onContentChange(newContent);
  };

  const deleteBlock = (blockId: string) => {
    const newContent = content.filter(block => block.id !== blockId);
    onContentChange(newContent);
  };

  const renderBlock = (block: Block, index: number) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addBlock(index, 'paragraph');
      }
    };

    switch (block.type) {
      case 'heading':
        return (
          <div key={block.id} className="group relative">
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="Título"
              className="w-full text-2xl font-bold text-gray-900 bg-transparent border-none outline-none focus:bg-gray-50 rounded px-2 py-1"
            />
            <BlockActions
              onAddBlock={() => setShowBlockMenu(index)}
              onDelete={() => deleteBlock(block.id)}
            />
          </div>
        );

      case 'paragraph':
        return (
          <div key={block.id} className="group relative">
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="Escribe algo..."
              className="w-full text-gray-900 bg-transparent border-none outline-none resize-none focus:bg-gray-50 rounded px-2 py-1 min-h-[2rem]"
              rows={1}
              style={{ height: 'auto' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
            <BlockActions
              onAddBlock={() => setShowBlockMenu(index)}
              onDelete={() => deleteBlock(block.id)}
            />
          </div>
        );

      case 'list':
        return (
          <div key={block.id} className="group relative">
            <div className="flex items-start">
              <span className="text-gray-400 mr-2 mt-1">•</span>
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder="Elemento de lista"
                className="flex-1 text-gray-900 bg-transparent border-none outline-none resize-none focus:bg-gray-50 rounded px-2 py-1 min-h-[2rem]"
                rows={1}
              />
            </div>
            <BlockActions
              onAddBlock={() => setShowBlockMenu(index)}
              onDelete={() => deleteBlock(block.id)}
            />
          </div>
        );

      case 'code':
        return (
          <div key={block.id} className="group relative">
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                placeholder="// Escribe tu código aquí"
                className="w-full bg-transparent border-none outline-none resize-none text-gray-900"
                rows={3}
              />
            </div>
            <BlockActions
              onAddBlock={() => setShowBlockMenu(index)}
              onDelete={() => deleteBlock(block.id)}
            />
          </div>
        );

      case 'image':
        return (
          <div key={block.id} className="group relative">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Imagen</p>
              <input
                type="url"
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                placeholder="URL de la imagen"
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <BlockActions
              onAddBlock={() => setShowBlockMenu(index)}
              onDelete={() => deleteBlock(block.id)}
            />
          </div>
        );

      case 'database':
        return (
          <div key={block.id} className="group relative">
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Database className="h-5 w-5 text-gray-600 mr-2" />
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                  placeholder="Nombre de la base de datos"
                  className="font-medium text-gray-900 bg-transparent border-none outline-none"
                />
              </div>
              <div className="text-sm text-gray-600">
                Base de datos en desarrollo...
              </div>
            </div>
            <BlockActions
              onAddBlock={() => setShowBlockMenu(index)}
              onDelete={() => deleteBlock(block.id)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Título de la página"
        className="w-full text-4xl font-bold text-gray-900 bg-transparent border-none outline-none mb-8 focus:bg-gray-50 rounded px-2 py-2"
      />

      {/* Content Blocks */}
      <div className="space-y-2">
        {content.map((block, index) => (
          <div key={block.id} className="relative">
            {renderBlock(block, index)}
            
            {/* Block Menu */}
            {showBlockMenu === index && (
              <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                <div className="grid grid-cols-3 gap-1">
                  {blockTypes.map(({ type, icon: Icon, label }) => (
                    <button
                      key={type}
                      onClick={() => addBlock(index, type as Block['type'])}
                      className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-xs"
                    >
                      <Icon className="h-4 w-4 mb-1" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add first block if empty */}
        {content.length === 0 && (
          <button
            onClick={() => addBlock(-1, 'paragraph')}
            className="w-full p-4 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
          >
            <Plus className="h-5 w-5 mx-auto mb-1" />
            Haz clic para agregar contenido
          </button>
        )}
      </div>
    </div>
  );
};

const BlockActions: React.FC<{ onAddBlock: () => void; onDelete: () => void }> = ({ onAddBlock, onDelete }) => (
  <div className="absolute left-0 top-0 -ml-10 opacity-0 group-hover:opacity-100 transition-opacity">
    <div className="flex flex-col space-y-1">
      <button
        onClick={onAddBlock}
        className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
      >
        <Plus className="h-3 w-3" />
      </button>
      <button
        onClick={onDelete}
        className="w-6 h-6 bg-red-200 hover:bg-red-300 rounded flex items-center justify-center"
      >
        ×
      </button>
    </div>
  </div>
);

export default PageEditor;