import cv2
import pytesseract
import difflib
import sys

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

class TesseractOcr:
    def get_text(self, img_path):
        img = cv2.imread(img_path)
        text = pytesseract.image_to_string(img)
        return text


wordsInRg = ['Registro Geral', 'Data de expedição', 'Doc origem', 'Diretora do instituto de identificacao', 'CPF']
wordsInCnh = ['Carteira Nacional', 'Habilitação',
              'Data emissão', 'validade', 'Categoria', 'Nome',
              'RG', 'Data, Local, UF', 'Assinatura portador', 'Driver', 'License']
wordsInReservista = ['Indeterminada', 'RA', 'Certificado de Dispensa de Incorporação'
                                            'Situação de serviço militar', 'servico', 'militar', 'Hash']

if __name__ == '__main__':
    tesseract = TesseractOcr()
    text = tesseract.get_text(sys.argv[1])

    maxValue = 0
    pieces = []
    if sys.argv[2] == 'rg':
        pieces = text.split('\n')
    if sys.argv[2] == 'cnh':
        pieces = text.split('\n')
    if sys.argv[2] == 'reservista':
        pieces = text.split('\n')

    for word in wordsInReservista:
        for piece in pieces:
            seq = difflib.SequenceMatcher(None, piece, word)
            d = seq.ratio() * 100
            maxValue = max(maxValue, d)

    print(maxValue)
