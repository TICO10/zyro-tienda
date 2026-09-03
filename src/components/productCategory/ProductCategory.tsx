import React, { useMemo } from 'react';
import type { Product } from '../../types/product';
import './ProductCategory.css';
import type { LetterTextIcon } from 'lucide-react';

interface ProductCategoryProps {
  product: Product[];
  selectedTypeId: string | null;
  onSelectType: (typeId: string | null) => void;
}

const COLOR_MAP: Record<string, { bg: string; border: string }> = {
  'Zona para mujeres': { border: '#2a121d', bg: '#831843' },
  'Zona para hombres': { border: '#081726', bg: '#1e3a5f' },
  'Parte superior':    { border: '#0b2314', bg: '#14532d' },
};

export const ProductCategory: React.FC<ProductCategoryProps> = ({ product, selectedTypeId, onSelectType }) => {

  const uniqueTypesInfo = useMemo<Array<{ id: string; name: string, count: number, color: { bg: string; border: string } }>>(() => {
    const map = new Map<string, { id: string; name: string, count: number, color: { bg: string; border: string } }>();
    let count = 0;
    product.forEach((item) => {
      if (!map.has(item.type.id)) {
        count++;
        map.set(item.type.id, {
          id: item.type.id,
          name: item.type.name,
          count: count,
          color: COLOR_MAP[item.type.id] ?? { bg: '#000000', border: '#000000' }, // Asignar color según el nombre del tipo
        });
      }
    });

    map.set('Todos', {
      id: 'Todos',
      name: 'Todos los productos',
      count: 0,
      color: { bg: '#000000', border: '#000000' },
    });

    return Array.from(map.values());
  }, [product]);

  return (
    uniqueTypesInfo.map((type) => (
      <div 
        className="rounded-xl overflow-hidden flex flex-col transition-allgroup" 
        style={{ backgroundColor: type.color.bg, borderColor: type.color.border }}
        onClick={() => onSelectType(type.id === 'Todos' ? null : type.id)}
      >
      <div key={type.id} className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <p className="text-xs mt-1 line-clamp-2">
            {type.count}
          </p>
          <h3 className="font-semibold text-lg text-white group-hover:text-pink-200 transition-colors">
            {type.id}
          </h3>
          <p className="text-xs mt-1 line-clamp-2">
            {type.name}
          </p>
        </div>
      </div>
      </div>
    ))
  );
};