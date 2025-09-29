from langchain.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from glob import glob
from langchain.schema import Document
from typing import List

#extract text from pdf file
def load_pdf_files(data):
    loader = DirectoryLoader(
        data,
        glob='*.pdf',
        loader_cls=PyPDFLoader
    )
    documents =loader.load()
    return documents


#filter the data
from typing import List
from langchain.schema import Document

def filter_to_minimal_docs(docs: List[Document]) -> List[Document]:
    """
    Given a list of Document objects, return a new list of Document objects
    containing only the original page_content and the 'source' in metadata.
    """
    minimal_docs: List[Document] = []
    for doc in docs:
        src = doc.metadata.get("source")
        minimal_docs.append(
            Document(
                page_content=doc.page_content,
                metadata={"source": src}
            )
        )
    return minimal_docs   



#split the document into smaller parts
def text_split(minimal_docs):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=20,
    )
    texts_chunk = text_splitter.split_documents(minimal_docs)
    return texts_chunk



def download_embeddings():
    '''
    download and return the hugging face embeding model
    '''
    model_name = "sentence-transformers/all-MiniLM-L6-v2"
    embeddings = HuggingFaceEmbeddings(
        model_name=model_name,
       

    )
    return embeddings